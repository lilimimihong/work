import { ElMessage } from 'element-plus'
import {defineStore} from 'pinia'
import { ref, computed } from 'vue'
interface Token{
    access_token:string
    refresh_token:string
    expires_in:number
    token_type:string
    user_id:string
}
export const useTokenStore = defineStore('mytoken', () => {
    const tokenJson = ref("")
    const token = computed<Token>(()=>{
        try{
            return JSON.parse(tokenJson.value || window.localStorage.getItem("TokenInfo") || "{}")
        }catch(err){
           ElMessage.error("token格式错误")
           window.localStorage.setItem("TokenInfo","")
           throw err
        }
    })

    //function 相当于action
    function saveToken(data:string){
        tokenJson.value = data
        window.localStorage.setItem("TokenInfo", data)
    }

    //向外暴露
    return {token, saveToken}

})