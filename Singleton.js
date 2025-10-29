// app.js
const AppConfig = (() => {
  let instance;

  function createInstance() {
    const state = {
      theme: "white-theme", // choose a sensible default
      lang: "en",
    };

    return {
      getTheme() {
        return state.theme;
      },
      setTheme(newTheme) {
        if (newTheme === "white-theme" || newTheme === "dark-theme") {
          state.theme = newTheme;
        } else {
          // optional: ignore or throw
          console.warn("Unknown theme:", newTheme);
        }
      },
      toggleTheme() {
        state.theme =
          state.theme === "white-theme" ? "dark-theme" : "white-theme";
      },
    };
  }

  return {
    getInstance() {
      if (!instance) instance = createInstance();
      return instance;
    },
    // For tests only:
    _resetForTesting() {
      instance = undefined;
    },
  };
})();

// DOM wiring
const darkBtn = document.getElementById("dark-theme");
const whiteBtn = document.getElementById("white-theme");
const themeTargets = document.querySelector(".theme-target");

const cfg = AppConfig.getInstance();
const cfg2 = AppConfig.getInstance();
console.log(cfg2 == cfg);

// helper to sync DOM with singleton state
function applyThemeToDom() {
  const current = cfg.getTheme();
  // remove both possible theme classes first
  themeTargets.classList.remove("white-theme", "dark-theme");
  // then add the active one
  themeTargets.classList.add(current);
}

// set initial theme on load
applyThemeToDom();

darkBtn.addEventListener("click", () => {
  cfg.setTheme("dark-theme");
  applyThemeToDom();
  console.log("theme:", cfg.getTheme());
});

whiteBtn.addEventListener("click", () => {
  cfg.setTheme("white-theme");
  applyThemeToDom();
  console.log("theme:", cfg.getTheme());
});

// optional single toggle button
// toggleBtn.addEventListener("click", () => { cfg.toggleTheme(); applyThemeToDom(); });
