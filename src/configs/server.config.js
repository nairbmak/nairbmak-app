/**
 * Contructor
 */
var config = {};

/**
 * Development configurations
 */
config.development = {
  API: {
    URL: 'http://localhost:3000',
    SET: '/report/set',
    GET: '/report/get'
  }
}

/**
 * Production configurations
 */
config.production = {
  API: {
    URL: 'http://localhost:3000',
    SET: '/report/set',
    GET: '/report/get'
  }
}

/**
 * Module exports
 */
module.exports = config;