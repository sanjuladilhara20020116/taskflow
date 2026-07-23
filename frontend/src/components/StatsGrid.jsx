const statItems = [
  {
    key: "total",
    label: "Total Tasks",
    description: "All created tasks",
    className: "stat-total",
  },
  {
    key: "pending",
    label: "Pending",
    description: "Tasks waiting to start",
    className: "stat-pending",
  },
  {
    key: "inProgress",
    label: "In Progress",
    description: "Tasks currently active",
    className: "stat-progress",
  },
  {
    key: "completed",
    label: "Completed",
    description: "Finished successfully",
    className: "stat-completed",
  },
  {
    key: "overdue",
    label: "Overdue",
    description: "Past the due date",
    className: "stat-overdue",
  },
];

export default function StatsGrid({ stats }) {
  return (
    <section className="stats-grid">
      {statItems.map((item) => (
        <article
          className={`stat-card ${item.className}`}
          key={item.key}
        >
          <div className="stat-card-top">
            <span className="stat-label">
              {item.label}
            </span>

            <span className="stat-indicator" />
          </div>

          <strong className="stat-number">
            {stats[item.key] ?? 0}
          </strong>

          <p>{item.description}</p>
        </article>
      ))}
    </section>
  );
}