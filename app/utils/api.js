import axios from 'axios';

const ApiLogin = axios.create({
  timeout: 10000,
  responseType: 'json',
});

const Api = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000,
  responseType: 'json',
});

export default Api;
export {
  ApiLogin,
};
