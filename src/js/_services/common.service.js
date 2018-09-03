import { authHeader } from '../_helpers/authHeader';
import {message} from 'antd'
import {tokenExpired} from "../_helpers/tokenExpired";
export const commonService = {
    getUsersByUsernames,
    getCustomersByCustomerIds,
    getAllCanSignContractUsers,
};

const apiStartPath='/api/common';
/**
 * @param user_names name1,name2,name3
 * @returns {Promise<Response>}
 */
function getUsersByUsernames(user_names){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiStartPath+`/users/`+user_names, requestOptions).then(handleResponse);
}

function getAllCanSignContractUsers(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiStartPath+`/users/contract_sign_users/`, requestOptions).then(handleResponse);
}

function getCustomersByCustomerIds(customer_ids){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiStartPath+`/customers/`+customer_ids, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto tokenExpired if 401 response returned from api
            message.error("登录信息过期，请重新登录！");
            tokenExpired();
        }else if(response.status === 500){
            message.error("错误，请稍后再试！");
        }else if(response.status === 404){
            message.error("用户名不存在！");
        }else if(response.status === 403){
            message.error("无权限！");
        }else if(response.status === 504){
            message.error("504 Bad Gateway！");
        }else{
            message.error('HTTP '+response.status+' Error!');
        }
        //
        // const error = (data && data.message) || response.statusText;
        // return Promise.reject(error);
        return null;
    }else{
        if(response.status === 201){
            message.success("操作完成！")
        }
        return response.text().then(text => {
            let data = text && JSON.parse(text);
            if(data==null){
                data='ok'
            }
            return data;
        });

    }
}