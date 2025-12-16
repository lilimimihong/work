import { useTokenStore } from "@/stores/token";
import request from "@/utils/Request";
//用户登录-参数类型
type loginInfo = {
    phone: string
    password: string
    code?: string
}

// //还可以这样写：写法1
// //提取公共类型参数
// type Common<T> = {
//     success: boolean
//     message: string
//     state: string
//     content: T
// }

// type LoginResult = Common<string>



//用户登录-返回数据类型
type LoginResult = {
    success: boolean
    message: string
    state: string
    content: string
}
//封装用户请求登录 login里面是具体的请求
//要求请求数据类型 application/x-www-form-urlencoded    需要把数据拼接为  属性1=值1$属性2=值2
//application/json  需要把数据拼接为json格式
export const login = (loginInfo:loginInfo) => {
    return request<LoginResult>({
        method: 'post',
        url: '/front/user/login',
        data: `phone=${loginInfo.phone}&password=${loginInfo.password}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//获取用户信息
// //写法2
// type UserInfo =  Common<{
//         isUpdatedPassword: boolean
//         portrait: string
//         userName: string
//     }>


type UserInfo = {
    success: boolean
    message: string
    state: string
    content: {
        isUpdatedPassword: boolean
        portrait: string
        userName: string
    }
}
export const getInfo = () => {
    return request<UserInfo>({
        method: 'GET',
        url: '/front/user/getInfo'

    })
}

//用户退出

export const logout = ()=>{
    return request({
        method: "POST",
        url: "/front/user/logout"
    })
}

//刷新token
type RToken = {
    message: string
    state: number
    success: boolean
    content: string

}
let promiseRT: Promise<any>
let isRefreshing = false
export const refreshToken= () =>{
    if (isRefreshing) {
        return promiseRT
    }
    isRefreshing = true
    promiseRT = request<RToken>({
        method: "POST",
        url: "/front/user/refresh_token",
        params: {
            refreshToken: useTokenStore().token?.refresh_token,
        },
    }).finally(()=>{
        isRefreshing = false
    })
    return promiseRT
}



