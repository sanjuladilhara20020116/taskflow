import { useEffect, useMemo, useState } from "react";

const messages = [
  "Plan clearly and complete the most important task first.",
  "Small progress every day creates meaningful results.",
  "Keep priorities visible and deadlines under control.",
  "Review unfinished work before starting something new.",
];

export default function DashboardHero({
  userName,
  stats,
}) {
  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [messageIndex, setMessageIndex] =
    useState(0);

  useEffect(() => {
    const clockTimer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const messageTimer = window.setInterval(() => {
      setMessageIndex(
        (currentIndex) =>
          (currentIndex + 1) % messages.length
      );
    }, 4500);

    return () => {
      window.clearInterval(clockTimer);
      window.clearInterval(messageTimer);
    };
  }, []);

  const greeting = useMemo(() => {
    const hour = currentTime.getHours();

    if (hour < 12) {
      return "Good morning";
    }

    if (hour < 18) {
      return "Good afternoon";
    }

    return "Good evening";
  }, [currentTime]);

  const completionRate =
    stats.total > 0
      ? Math.round(
          (stats.completed / stats.total) * 100
        )
      : 0;

  return (
    <section className="dashboard-hero">
      <div className="hero-content">
        <p className="hero-label">
          Daily task overview
        </p>

        <h2>
          {greeting}, {userName}
        </h2>

        <p
          className="dynamic-message"
          key={messageIndex}
        >
          {messages[messageIndex]}
        </p>

        <div className="hero-progress">
          <div className="progress-heading">
            <span>Overall completion</span>
            <span>{completionRate}%</span>
          </div>

          <div className="progress-track">
            <div
              className="progress-value"
              style={{
                width: `${completionRate}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="live-time-card">
        <span className="live-time-label">
          Current time
        </span>

        <strong>
          {currentTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </strong>

        <span>
          {currentTime.toLocaleDateString([], {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

        <p>
          {stats.pending + stats.inProgress} active
          tasks need attention.
        </p>
      </div>
    </section>
  );
}