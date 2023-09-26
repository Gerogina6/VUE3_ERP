import { defineStore } from 'pinia'

export const useInfoStore = defineStore("userinfo-store", () => {
    // 将token放在本地浏览器localStorage里
    const setAuth = () => {

    }
    // 判断用户是否登录
    const authFormLocal = () => {

    }
    // 将token从请求头部中清除
    const removeAuth = () => {

    }
    
    return {
        setAuth,
        authFormLocal,
        removeAuth,
    }
})