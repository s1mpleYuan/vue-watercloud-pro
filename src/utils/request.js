import axios from 'axios';
import qs from 'qs';

const http = {
  get: (url, params) => {
    return axios.get(url, {params});
  },
  post: (url, params) => {
    return axios.post(url, qs.stringify(params));
  },
  delete: (url, params) => {
    return axios.delete(url, {params});
  }
};
export default http;