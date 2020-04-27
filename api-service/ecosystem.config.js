module.exports = {
  apps : [{
    name: 'Tic Tac Toe back-end',
    script: 'node lib/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
