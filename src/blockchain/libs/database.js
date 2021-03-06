var EventEmitter = require('events');
var Database_ABI = require('../api/contracts/Database.json').abi;

const INSTANCE_ERROR = 'Cannot create Database instance';

class Database {
  constructor(Database_ADDRESS, web3Instance) {
    class Emitter extends EventEmitter { }
    this.emitter = new Emitter();

    if (!web3Instance) return false;
    this.web3 = web3Instance;

    if (!Database_ABI) return false;
    if (!Database_ADDRESS || !this.web3.isAddress(Database_ADDRESS)) return false;
    var Database_CONTRACT = this.web3.eth.contract(Database_ABI).at(Database_ADDRESS);

    this.DATABASE = {
      ABI: Database_ABI,
      ADDRESS: Database_ADDRESS,
      INSTANCE: Database_CONTRACT
    }
  }

  /**
   * Statics
   */
  static get ABI() { return Database_ABI }

  /**
   * Submit report
   * return txId
   */
  submitReport(hashRoot, reviewers) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.DATABASE.INSTANCE.submitReport(hashRoot, reviewers, { from: self.web3.eth.coinbase }, (er, txId) => {
        if (er) return reject(er);
        return resolve(txId);
      });
    });
  }

  /**
   * Score report
   * return txId
   */
  scoreReport(hashRoot, completeness, importance) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.DATABASE.INSTANCE.scoreReport(hashRoot, completeness, importance, { from: self.web3.eth.coinbase }, (er, txId) => {
        if (er) return reject(er);
        return resolve(txId);
      });
    });
  }

  /**
   * Close report
   * return txId
   */
  closeReport(hashRoot) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.DATABASE.INSTANCE.closeReport(hashRoot, { from: self.web3.eth.coinbase }, (er, txId) => {
        if (er) return reject(er);
        return resolve(txId);
      });
    });
  }

  /**
   * Get explorer
   * return result
   */
  getExplorer(index) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.DATABASE.INSTANCE.getExplorer(index, (er, re) => {
        if (er) return reject(er);
        return resolve(re);
      });
    });
  }

  /**
   * Get report
   * return result
   */
  getReport(hashRoot) {
    var self = this;
    return new Promise((resolve, reject) => {
      self.DATABASE.INSTANCE.getReport(hashRoot, (er, re) => {
        if (er) return reject(er);
        return resolve(re);
      });
    });
  }

  /**
   * Watch any changes
   */
  watch() {
    var self = this;
    return new Promise((resolve, reject) => {
      if (!self.DATABASE) return reject(INSTANCE_ERROR);
      var watcher = self.DATABASE.INSTANCE.allEvents();
      watcher.watch((er, event) => {
        if (er) return self.emitter.emit('error', er);
        return self.emitter.emit('data', event);
      });

      var stopWatching = function () {
        watcher.stopWatching();
        self.emitter.removeAllListeners();
      }

      return resolve({ stopWatching: stopWatching, event: self.emitter });
    });
  }
}

export default Database;