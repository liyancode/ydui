import { authHeader } from '../_helpers/authHeader';
import { tokenExpired } from '../_helpers/tokenExpired';
import {message} from 'antd'
export const customerService = {
    getAllByUsername,
    getAll,
    getCustomers,
    getByCustomerId,
    addCustomer,
    updateCustomer,
    updateContact,
    deleteByCustomerId
};

/**
 * @param username
 * @param my_or_all: crm_my or crm_all
 */
function getCustomers(username,my_or_all){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    if(my_or_all==='crm_my'){
        return fetch(`/api/customers/`+username, requestOptions).then(handleResponse);
    }else{
        return fetch(`/api/customers/all/`, requestOptions).then(handleResponse);
    }
}
function getAllByUsername(username){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/customers/`+username, requestOptions).then(handleResponse);
}

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/customers/all/`, requestOptions).then(handleResponse);
}


function getByCustomerId(customerId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/customers/customer/`+customerId, requestOptions).then(handleResponse);
}

// customer={company:{},contact:{}}
function addCustomer(customerData){
    console.log(customerData);
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(customerData)
    };
    return fetch(`/api/customers/customer`, requestOptions).then(handleResponse);
}
function updateCustomer(customerData){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(customerData)
    };
    return fetch(`/api/customers/customer`, requestOptions).then(handleResponse);
}

function updateContact(contactData){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(contactData)
    };
    return fetch(`/api/customers/customer_contact`, requestOptions).then(handleResponse);
}
function deleteByCustomerId(customerId){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/api/customers/customer/`+customerId, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto tokenExpired if 401 response returned from api
                message.error("登录信息过期，请重新登录！");
                tokenExpired();
            }else if(response.status === 500){
                message.error("错误，请稍后再试！");
            }else if(response.status === 404){
                message.error("资源不存在！");
            }else if(response.status === 403){
                message.error("无权限！");
            }else if(response.status === 409){
                message.error("创建的记录已存在！");
            }
            //
            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);
        }else if(response.status === 201){
            message.success("操作完成！")
        }
        return data;
    });
}
