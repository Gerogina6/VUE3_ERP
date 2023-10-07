import axios, { AxiosError } from 'axios';
import router from '@/router'
import type { AxiosRequestConfig } from 'axios';
import { ElMessage,ElLoading } from 'element-plus';
// 创建axios实例
export const httpInstance = axios.create({
    // 服务接口请求
    baseURL: import.meta.env.VITE_BASEURL,
    // 超时设置
    timeout: 5000,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
});

export type BkResponse = {
    data: any;
    code: number;
    message: string;
    succeed: true;
};

// 设置请求根路径
// httpInstance.defaults.baseURL = import.meta.env.VITE_BASEURL;

// 配置响应拦截器
export const $http = async(config: AxiosRequestConfig) => {
    const loadingInstance = ElLoading.service()
    try {
        const axiosResponse = await httpInstance<BkResponse>(config);
        const bkResponse = axiosResponse.data

        if (!bkResponse?.succeed) {
            let errTitle: string = 'Error';
            if (bkResponse.code === 401) {
                errTitle = 'Unauthorized';
                ElMessage.error('未授权')
                router.push('login')
            } else if (bkResponse.code === 403 ) {
                errTitle = 'Forbidden'
            } else if (bkResponse.code === 9999) {
                errTitle = '9999Error'
            } else if (bkResponse.code === 500) {
                errTitle = 'ServerError'
            } else {
                errTitle = 'Unknown'
            }
            const err = new Error(bkResponse?.message || 'Unknown')
            err.name = errTitle
            throw err
        }
        return bkResponse;
    } catch (err) {
        if (err instanceof AxiosError) {
            ElMessage.error('网络错误')
        }
        throw err
    } finally {
        loadingInstance.close()
    }
}