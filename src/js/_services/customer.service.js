import { authHeader } from '../_helpers/auth-header';
import {message} from 'antd'
export const customerService = {
    getAllByUsername,
    getByCustomerId,
    addCustomer,
    updateCustomer,
    deleteByCustomerId
};

function getAllByUsername(username){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/customers/`+username, requestOptions).then(handleResponse);
}

function getByCustomerId(customerId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/customers/`+customerId, requestOptions).then(handleResponse);
}

function addCustomer(customerId){

}
function updateCustomer(customerId){

}
function deleteByCustomerId(customerId){

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                message.error("登录信息过期，请重新登录！");
                logout();
            }else if(response.status === 500){
                message.error("错误，请稍后再试！");
            }else if(response.status === 404){
                message.error("资源不存在！");
            }else if(response.status === 403){
                message.error("无权限！");
            }
            //
            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }else{
            message.success("刷新成功！");
        }
        return data;
    });
}
