import { authHeader } from '../_helpers/authHeader';
import { tokenExpired } from '../_helpers/tokenExpired';
import {message} from 'antd'
export const orderService = {
    getOrders,
    getOrderById,
    addNewOrder,
    updateOrder,
    deleteOrder,
    addNewAskPrice,
    getAskPricesByUserName,
    getAskPriceById,
    updateAskPrice,
    getContractsByUserName,
    getContractById
};

function getOrderById(order_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/order/`+order_id, requestOptions).then(handleResponse);
}
function getOrders() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/by_user_name`, requestOptions).then(handleResponse);
}
function getContractsByUserName() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/contracts/by_user_name`, requestOptions).then(handleResponse);
}
function getContractById(contract_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/contracts/contract/`+contract_id, requestOptions).then(handleResponse);
}
function updateOrder(order) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body:JSON.stringify(order)
    };

    return fetch(`/api/orders/order`, requestOptions).then(handleResponse);
}

function deleteOrder(order_id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/api/orders/order/`+order_id, requestOptions).then(handleResponse);
}

function addNewOrder(order) {
    const requestOptions = {
        method: 'Post',
        headers: authHeader(),
        body:JSON.stringify(order)
    };

    return fetch(`/api/orders/order`, requestOptions).then(handleResponse);
}

function addNewAskPrice(ask_price) {
    const requestOptions = {
        method: 'Post',
        headers: authHeader(),
        body:JSON.stringify(ask_price)
    };

    return fetch(`/api/orders/ask_prices/ask_price`, requestOptions).then(handleResponse);
}

function getAskPricesByUserName() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/ask_prices/by_user_name`, requestOptions).then(handleResponse);
}
function getAskPriceById(ask_price_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/ask_prices/ask_price/`+ask_price_id, requestOptions).then(handleResponse);
}
function updateAskPrice(ask_price) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/ask_prices/by_user_name`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto tokenExpired if 401 response returned from api
            message.error("用户名或密码错误！");
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
        if(response.status >= 201){
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