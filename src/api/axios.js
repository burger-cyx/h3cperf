/* axios 二次封装 */
import axios from "axios";

const is_dev = true;
const baseUrl = is_dev
  ? "http://39.175.132.230:35018"
  : "http://172.30.130.137:8000/";

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {},
    };
    return config;
  }
  interception(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    options = { ...this.getInsideConfig(), ...options };
    const axiosInstance = axios.create();
    this.interception(axiosInstance);
    return axiosInstance(options);
  }
}

const http = new HttpRequest(baseUrl);

export default http;
