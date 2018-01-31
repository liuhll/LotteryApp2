import axios from 'axios'
import { Toast } from 'vux'
import { getToken } from '@/utils/auth'
import store from '../store'

const TokenKey = 'Lottery-App-Token'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 15000 // 请求超时时间
  })

// request拦截器
service.interceptors.request.use(config => {
    if (store.getters.token) {
      config.headers[TokenKey] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })  


// respone拦截器
service.interceptors.response.use(
    response => {
    }
  )