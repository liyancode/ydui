import { authHeader } from '../_helpers/auth-header';
import {message} from 'antd'
export const orderService = {
    getOrders
};

function getOrders() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log(data);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                message.error("登录信息过期，请重新登录！");
            }else if(response.status === 500){
                message.error("系统，请稍后再试！");
            }
        }

        return data;
    });
}