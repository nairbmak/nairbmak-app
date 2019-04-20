/**
 * Contructor
 */
var config = {};

/**
 * Development configurations
 */
config.development = {
  API: {
    URL: 'https://localhost:3000',
    // URL: 'http://172.25.8.103:3000',
    SET: '/report/set',
    GET: '/report/get'
  }
}

/**
 * Production configurations
 */
config.production = {
  API: {
    URL: 'https://localhost:3000',
    SET: '/report/set',
    GET: '/report/get'
  }
}

/**
 * Module exports
 */
module.exports = config;