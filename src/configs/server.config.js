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
    // URL: 'http://172.25.8.103:3000',
    SET: '/report/set',
    GET: '/report/get',
    BUY: '/data/buy'
  }
}

/**
 * Production configurations
 */
config.production = {
  API: {
    URL: 'http://localhost:3000',
    SET: '/report/set',
    GET: '/report/get',
    BUY: '/data/buy'
  }
}

/**
 * Module exports
 */
module.exports = config;