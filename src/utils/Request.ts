import axios, { type AxiosRequestConfig, type AxiosRequestHeaders } from 'axios'
import { useTokenStore } from '@/stores/token'
// import { error } from 'console'
import { refreshToken } from '@/api/users'
import router from '@/router/index'
import { ElMessage } from 'element-plus'


const request = axios.create({
    //不再直接向接口服务器请求
//   baseURL: import.meta.env.VITE_API_URL,//http://39.97.218.60/
  timeout: 10000
})

//请求拦截器
request.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  if(!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }
  const store=useTokenStore()
  config.headers.Authorization =store.token?.access_token
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use((response)=>response,async (error)=>{
  // 对响应错误做点什么
    if(error.request.status==401){
     const {data} = await refreshToken()
     if (data.success){
      //保存新tiken
      useTokenStore().saveToken(data.content)
      //重新请求之前的接口,并且把结果返回
      return request(error.config)


     }else {
      //跳转到login
      ElMessage.error("token失效,请重新登录")
      router.push({name :"/login"})
       
     }
  }
   return Promise.reject(error)
})

export default request