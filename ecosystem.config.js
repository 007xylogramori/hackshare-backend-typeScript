/* eslint-disable no-undef */
module.exports = {
    apps: [
        {
            name: "hackshare-backend-app",
            script: "./dist/server.js",
            instances: "max",
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};