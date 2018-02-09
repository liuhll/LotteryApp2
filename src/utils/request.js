import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import store from '../store'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
  })

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.common.Authorization = getToken(); 
    }
    return config;
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })  


// respone拦截器
service.interceptors.response.use(
    response => {
        const data = response.data;
        return data;
    },
    error => { 
      console.log('err' + error)// for debug
      removeToken()
    }
  )

  export default service  