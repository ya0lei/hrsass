import axios from 'axios'
import { Message } from 'element-ui'
// 创建一个axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API // 根据不同环境配置基地址
})

// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 1.本次项目的业务,所有的接口返回值都有success,code,message,data
    // 2.本次项目所有返回的错误信息,都是通过success和message告诉你的
    // 3.先处理成功的数据
    // 4.首先给一个提示信息,通过element-ui的Message组件提示
    // 5.
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      // 请求成功了,但有一些未知错误,比如用户名重复
      Message.error(message)
      // 请求有问题,代表接口有问题,人为的制造catch捕获
      return Promise.reject(new Error(message))
    }
    // return response
  },
  function(error) {
    // 接口返回值异常
    // 代码书写错误
    Message.error(error.message)
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default service
