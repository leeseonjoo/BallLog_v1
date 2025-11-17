module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@core": "./src/core",
            "@features": "./src/features",
            "@shared": "./src/shared-ui",
            "@domain": "./src/domain",
            "@data": "./src/data"
          }
        }
      ]
    ]
  };
};


