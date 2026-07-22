const formatDate = (dateValue) => {
  if (!dateValue) {
    return "Not available";
  }

  return new Date(
    `${dateValue}T00:00:00`
  ).toLocaleDateString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (dateValue) => {
  if (!dateValue) {
    return "Not available";
  }

  return new Date(dateValue).toLocaleString([], {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getTodayDate = () => {
  const currentDate = new Date();

  currentDate.setMinutes(
    currentDate.getMinutes() -
      currentDate.getTimezoneOffset()
  );

  return currentDate.toISOString().split("T")[0];
};

export default function TaskList({
  tasks,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="task-loading-grid">
        {Array.from({ length: 4 }).map(
          (_, index) => (
            <div
              className="task-skeleton"
              key={index}
            >
              <span />
              <span />
              <span />
            </div>
          )
        )}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-mark">TF</div>
        <h4>No tasks were found</h4>
        <p>
          Create a task or change the current search
          and filter selections.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => {
        const isOverdue =
          task.dueDate < getTodayDate() &&
          task.status !== "Completed";

        return (
          <article
            className={`task-card ${
              isOverdue ? "task-overdue" : ""
            }`}
            key={task.id}
          >
            <div className="task-main">
              <div className="task-badges">
                <span
                  className={`status-badge status-${task.status
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                >
                  {task.status}
                </span>

                <span
                  className={`priority-badge priority-${task.priority.toLowerCase()}`}
                >
                  {task.priority} priority
                </span>

                {isOverdue && (
                  <span className="overdue-badge">
                    Overdue
                  </span>
                )}
              </div>

              <h4>{task.title}</h4>

              <p className="task-description">
                {task.description ||
                  "No description was provided."}
              </p>
            </div>

            <div className="task-details">
              <div>
                <span>Due date</span>
                <strong>
                  {formatDate(task.dueDate)}
                </strong>
              </div>

              <div>
                <span>Created</span>
                <strong>
                  {formatDateTime(task.createdAt)}
                </strong>
              </div>

              <div>
                <span>Last updated</span>
                <strong>
                  {formatDateTime(task.updatedAt)}
                </strong>
              </div>
            </div>

            <div className="task-actions">
              <button
                type="button"
                className="edit-button"
                onClick={() => onEdit(task)}
              >
                Edit
              </button>

              <button
                type="button"
                className="delete-button"
                onClick={() => onDelete(task)}
              >
                Delete
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}