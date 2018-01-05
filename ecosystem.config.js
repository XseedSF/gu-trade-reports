module.exports = {
  apps: [
    {
      name: "gu-trade-reports",
      script: "./index.js"
    }
  ],
  deploy: {
    production: {
      user: "gutrade",
      host: "http://52.168.124.48/",
      key: "~/.ssh/gu-trade-reports.pem",
      ref: "origin/master",
      repo: "https://github.com/XseedSF/gu-trade-reports.git",
      path: "/home/ubuntu/gu-trade-reports",
      "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
    }
  }
};
