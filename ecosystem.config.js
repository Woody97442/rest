module.exports = {
  apps: [
    {
      name: "rest",
      script: "npm",
      args: "run preview",
      env: {
        PORT: 3667,
        NODE_ENV: "production",
      },
    },
  ],
};
