/**
 * Contructor
 */
var config = {};

/**
 * Development configurations
 */
config.development = {
  NETWORK: 89,
  WORK: {
    ADDRESS: '0xa1dcd70c009de7dbf64f0bdd903c7c990287931d'
  },
  DATABASE: {
    ADDRESS: '0xadfd22b9d184194a48090f95a5acc7c2c57fd29d'
  },
  DISTRIBUTION: {
    ADDRESS: '0x28c413614de7ec76b793285ba80052b444619b1a'
  },
};

/**
 * Production configurations
 */
config.production = {
  NETWORK: 89,
  WORK: {
    ADDRESS: '0x76c5b4def19c1262e120ca1195e7722cbd6c81e6'
  },
  DATABASE: {
    ADDRESS: '0x46211ebb6a9c98a7768dfe37e55ea7474351d760'
  },
  DISTRIBUTION: {
    ADDRESS: '0xda2cdf61ac02117250f786037a47692bbf8d3516'
  },
};

/**
 * Module exports
 */
module.exports = config;
