export default function AppHeader({
  user,
  theme,
  onToggleTheme,
  onLogout,
}) {
  return (
    <header className="app-header">
      <div className="brand-area">
        <div className="brand-mark">TF</div>

        <div>
          <h1 className="brand-name">TaskFlow</h1>
          <p className="brand-subtitle">
            Personal productivity workspace
          </p>
        </div>
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