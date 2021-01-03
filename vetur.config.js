/** @type {import('vls').VeturConfig} */
module.exports = {
  projects: [
    {
      root: "./client",
      package: "./package.json",
      tsconfig: "./tsconfig.json",
      globalComponents: ["./src/components/**/*.vue"],
    },
  ],
};
