import { authHeader } from '../_helpers/auth-header';
import {message} from 'antd'
export const orderService = {
    getOrders,
    getOrderById,
    addNewOrder,
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
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        // console.log(data);
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            message.error("登录信息过期，请重新登录！");
        }else if(response.status === 500){
            message.error("系统，请稍后再试！");
        }else if(response.status === 201){
            message.success("数据添加成功！");
        }

        return data;
    });
}