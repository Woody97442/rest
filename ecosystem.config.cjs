module.exports = {
  apps: [
    {
      name: "rest",
      script: "npm",
      args: "run preview",
      interpreter: "none", // ← pour que PM2 n’essaye pas d’utiliser Node
      env: {
        PORT: 3667,
        NODE_ENV: "production",
      },
    },
  ],
};
