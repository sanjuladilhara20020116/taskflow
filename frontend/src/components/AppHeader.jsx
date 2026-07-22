export default function AppHeader({
  user,
  theme,
  onToggleTheme,
  onLogout,
}) {
  return (
    <header className="app-header">
      <div className="brand-area header-brand">
        <img
          src="/images/taskflow.png"
          alt="TaskFlow logo"
          className="header-logo-image"
        />
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="secondary-button theme-button"
          onClick={onToggleTheme}
        >
          {theme === "dark"
            ? "Light mode"
            : "Dark mode"}
        </button>

        <button
          type="button"
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
}