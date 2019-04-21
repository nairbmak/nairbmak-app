import axios from 'axios';
import config from 'configs';

class API {

  static getIPFS(hash) {
    return axios({
      method: 'get',
      baseURL: config.server.API.URL,
      url: config.server.API.GET,
      params: {
        hash: hash
      }
    });
  }

  static setIPFS(data) {
    return axios({
      method: 'post',
      baseURL: config.server.API.URL,
      url: config.server.API.SET,
      data: {
        data: data
      }
    });
  }

  static buyData(txId, data) {
    return axios({
      method: 'post',
      baseURL: config.server.API.URL,
      url: config.server.API.BUY,
      data: {
        txId: txId,
        data: data
      }
    });
  }
}

export default API;