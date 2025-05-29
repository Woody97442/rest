module.exports = {
  apps: [
    {
      name: "rest", // Nom de l'app PM2
      script: "npx", // On lance npx
      args: "serve -s dist -l 3667", // Arguments de la commande npx
      cwd: "/home/woody97442/htdocs/rest.wbpro.fr", // Dossier de travail
      watch: false, // Pas de watch (prod)
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
