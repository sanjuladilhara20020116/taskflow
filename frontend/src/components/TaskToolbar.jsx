export default function TaskToolbar({
  search,
  status,
  priority,
  sort,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
  onReset,
  onCreate,
}) {
  const filtersActive =
    search || status || priority || sort !== "newest";

  return (
    <section className="task-toolbar">
      <div className="toolbar-heading">
        <div>
          <p className="section-label">
            Task management
          </p>
          <h3>Your tasks</h3>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={onCreate}
        >
          Create task
        </button>
      </div>

      <div className="toolbar-controls">
        <div className="search-control">
          <label htmlFor="taskSearch">
            Search by task title
          </label>

          <input
            id="taskSearch"
            type="search"
            value={search}
            placeholder="Enter a task title"
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
          />
        </div>

        <div className="filter-control">
          <label htmlFor="statusFilter">
            Status
          </label>

          <select
            id="statusFilter"
            value={status}
            onChange={(event) =>
              onStatusChange(event.target.value)
            }
          >
            <option value="">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Completed">
              Completed
            </option>
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="priorityFilter">
            Priority
          </label>

          <select
            id="priorityFilter"
            value={priority}
            onChange={(event) =>
              onPriorityChange(event.target.value)
            }
          >
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="sortFilter">
            Sort by
          </label>

          <select
            id="sortFilter"
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value)
            }
          >
            <option value="newest">
              Newest created
            </option>
            <option value="oldest">
              Oldest created
            </option>
            <option value="dueDate">
              Due date
            </option>
          </select>
        </div>

        <button
          type="button"
          className="secondary-button reset-button"
          onClick={onReset}
          disabled={!filtersActive}
        >
          Reset
        </button>
      </div>
    </section>
  );
}