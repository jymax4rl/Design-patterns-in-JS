// The Singleton pattern using a closure
const AppConfig = (() => {
  let instance;

  function createInsance() {
    const config = {
      name: "My App",
      theme: "dark",
      lang: "en",
    };
    return config;
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInsance();
      }
      return instance;
    },
  };
})();

instance1 = AppConfig.getInstance();

console.log(instance1);
