import { authHeader } from '../_helpers/authHeader';
import { tokenExpired } from '../_helpers/tokenExpired';
import {message} from 'antd'

import {service_Util_} from "./service._util_";

export const serviceCustomer = {
    getAllByUsername,
    getAll,
    getCustomers,
    getByCustomerId,
    addCustomer,
    addCustomerContact,
    updateCustomer,
    updateContact,
    deleteByCustomerId,
    deleteCustomerContactById,

    // customer followup
    addCustomerFollowup,
    deleteCustomerFollowupById,
    updateCustomerFollowup,
    getCustomerFollowupById,
    getCustomerFollowupsByCIdUname,
};

const apiPrefix = '/api/service/customer';

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
        return fetch(apiPrefix+`/`+username, requestOptions).then(handleResponse);
    }else{
        return fetch(apiPrefix+`/all/`, requestOptions).then(handleResponse);
    }
}
function getAllByUsername(username){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiPrefix+`/`+username, requestOptions).then(handleResponse);
}

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiPrefix+`/all/`, requestOptions).then(handleResponse);
}


function getByCustomerId(customerId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(apiPrefix+`/customer/`+customerId, requestOptions).then(handleResponse);
}

// customer={company:{},contact:{}}
function addCustomer(customerData){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(customerData)
    };
    return fetch(apiPrefix+`/customer`, requestOptions).then(handleResponse);
}

function addCustomerContact(contact){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(contact)
    };
    return fetch(apiPrefix+`/customer_contact`, requestOptions).then(handleResponse);
}
function updateCustomer(customerData){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(customerData)
    };
    return fetch(apiPrefix+`/customer`, requestOptions).then(handleResponse);
}

function updateContact(contactData){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(contactData)
    };
    return fetch(apiPrefix+`/customer_contact`, requestOptions).then(handleResponse);
}
function deleteByCustomerId(customerId){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(apiPrefix+`/customer/`+customerId, requestOptions).then(handleResponse);
}

function deleteCustomerContactById(id) {
    return service_Util_.common_Delete_(apiPrefix + `/customer_contact/`, id).then(handleResponse);
}

//customer followup
function addCustomerFollowup(body) {
    return service_Util_.common_Post_(apiPrefix + '/customer_followup', body).then(handleResponse);
}

function deleteCustomerFollowupById(id) {
    return service_Util_.common_Delete_(apiPrefix + `/customer_followup/`, id).then(handleResponse);
}

function updateCustomerFollowup(body) {
    return service_Util_.common_Put_(apiPrefix + `/customer_followup`, body).then(handleResponse);
}

function getCustomerFollowupById(id) {
    return service_Util_.common_Get_(apiPrefix + `/customer_followup/`, id).then(handleResponse);
}

function getCustomerFollowupsByCIdUname(customer_id,user_name) {
    return service_Util_.common_Get_(apiPrefix + `/customer_followup/list/by_cid_uname/?customer_id=`+customer_id+`&user_name=`, user_name).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto tokenExpired if 401 response returned from api
            message.error("用户名或密码错误！");
            tokenExpired();
        } else if (response.status === 500) {
            message.error("错误，请稍后再试！");
        } else if (response.status === 404) {
            message.error("用户名不存在！");
        } else if (response.status === 403) {
            message.error("无权限！");
        } else if (response.status === 504) {
            message.error("504 Bad Gateway！");
        } else {
            message.error('HTTP ' + response.status + ' Error!');
        }
        //
        // const error = (data && data.message) || response.statusText;
        // return Promise.reject(error);
        return null;
    } else {
        if (response.status === 201) {
            message.success("操作完成！")
        }
        return response.text().then(text => {
            let data = text && JSON.parse(text);
            if (data == null) {
                data = 'ok'
            }
            return data;
        });

    }
}
