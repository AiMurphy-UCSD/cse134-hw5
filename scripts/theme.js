document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll('.js-only').forEach(el => el.style.display = 'inline-block');
  const root = document.documentElement;
  const modeBtn = document.getElementById("mode");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
  }

  if (modeBtn) {
    modeBtn.addEventListener("click", () => {
      const isDark = root.getAttribute("data-theme") === "dark";

      if (isDark) {
        root.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
      } else {
        root.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

});

