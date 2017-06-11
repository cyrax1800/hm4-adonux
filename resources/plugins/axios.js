import axios from 'axios'

// let instance = axios.create();
let instance = axios.create({
  baseURL: '/api/',
  timeout:120000,
  headers: {'Accept': 'application/json'},
});


export default instance
export var CancelToken = axios.CancelToken;
