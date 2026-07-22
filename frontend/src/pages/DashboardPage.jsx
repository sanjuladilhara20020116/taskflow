import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apiClient from "../api/apiClient";
import AppHeader from "../components/AppHeader";
import DashboardHero from "../components/DashboardHero";
import Pagination from "../components/Pagination";
import StatsGrid from "../components/StatsGrid";
import TaskFormModal from "../components/TaskFormModal";
import TaskList from "../components/TaskList";
import TaskToolbar from "../components/TaskToolbar";
import { useAuth } from "../context/AuthContext";
import useDebounce from "../hooks/useDebounce";

const emptyStats = {
  total: 0,
  pending: 0,
  inProgress: 0,
  completed: 0,
  overdue: 0,
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(emptyStats);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 8,
  });

  const [loadingTasks, setLoadingTasks] =
    useState(true);

  const [selectedTask, setSelectedTask] =
    useState(null);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const debouncedSearch = useDebounce(search, 350);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const getErrorMessage = (error) => {
    return (
      error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.message ||
      "The request could not be completed."
    );
  };

  const loadStats = useCallback(async () => {
    const response = await apiClient.get(
      "/tasks/stats"
    );

    setStats(response.data.stats);
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setLoadingTasks(true);

      const response = await apiClient.get(
        "/tasks",
        {
          params: {
            search: debouncedSearch || undefined,
            status: status || undefined,
            priority: priority || undefined,
            sort,
            page,
            limit: 8,
          },
        }
      );

      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoadingTasks(false);
    }
  }, [
    debouncedSearch,
    status,
    priority,
    sort,
    page,
  ]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    loadStats().catch((error) => {
      toast.error(getErrorMessage(error));
    });
  }, [loadStats]);

  const handleLogout = () => {
    logout();
    toast.success("You have been logged out.");
    navigate("/login", { replace: true });
  };

  const handleThemeToggle = () => {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark"
    );
  };

  const handleCreate = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSave = async (taskData) => {
    try {
      if (selectedTask) {
        await apiClient.put(
          `/tasks/${selectedTask.id}`,
          taskData
        );

        toast.success("Task updated successfully.");
      } else {
        await apiClient.post("/tasks", taskData);

        toast.success("Task created successfully.");
      }

      setIsModalOpen(false);
      setSelectedTask(null);

      await Promise.all([
        loadTasks(),
        loadStats(),
      ]);
    } catch (error) {
      toast.error(getErrorMessage(error));
      throw error;
    }
  };

  const handleDelete = async (task) => {
    const confirmed = window.confirm(
      `Delete "${task.title}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await apiClient.delete(`/tasks/${task.id}`);

      toast.success("Task deleted successfully.");

      await loadStats();

      if (tasks.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1);
      } else {
        await loadTasks();
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatus("");
    setPriority("");
    setSort("newest");
    setPage(1);
  };

  return (
    <div className="app-shell">
      <AppHeader
        user={user}
        theme={theme}
        onToggleTheme={handleThemeToggle}
        onLogout={handleLogout}
      />

      <main className="dashboard-container">
        <DashboardHero
          userName={user?.name || "Administrator"}
          stats={stats}
        />

        <StatsGrid stats={stats} />

        <TaskToolbar
          search={search}
          status={status}
          priority={priority}
          sort={sort}
          onSearchChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onPriorityChange={(value) => {
            setPriority(value);
            setPage(1);
          }}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
          onReset={handleResetFilters}
          onCreate={handleCreate}
        />

        <TaskList
          tasks={tasks}
          loading={loadingTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          onPageChange={setPage}
        />
      </main>

      <TaskFormModal
        isOpen={isModalOpen}
        task={selectedTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}