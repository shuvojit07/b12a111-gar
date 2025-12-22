const ThemeToggle = () => {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm">
      🌙 / ☀️
    </button>
  );
};

export default ThemeToggle;
