import { httpInstance } from '@/apis'
import router from '@/router'
import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore("userinfo-store", () => {
    // 将token放在本地浏览器localStorage里
    const setAuth = (token:string) => {
        httpInstance.defaults.headers.common.Authorization = token
        localStorage.setItem("token", token)
    }
    // 判断用户是否登录
    const authFormLocal = () => {
        const token = localStorage.getItem("token")
        if(token) {
            setAuth(token)
            return true
        }
        return false
    }
    // 将token从请求头部中清除
    const removeAuth = () => {
        delete httpInstance.defaults.headers.common.Authorization
        localStorage.removeItem("token")
        router.push("/login")
    }

    return {
        setAuth,
        authFormLocal,
        removeAuth,
    }
})