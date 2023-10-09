import { $http } from '.';

export const getUserlistApi = (params: { pageSize: number, requestPage: number}) => {
    return $http ({
        method: 'GET',
        url: '/admin/user/listWithPage',
        params,
    })
}