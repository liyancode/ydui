import { authHeader } from '../_helpers/authHeader';
import { tokenExpired } from '../_helpers/tokenExpired';
import {message} from 'antd'
export const productService = {
    getAll,
    getByProductTypeId,
    getByProductId,
    addProduct,
    updateProduct,
    getAllProductTypes
};

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/products/`, requestOptions).then(handleResponse);
}

function getAllProductTypes(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/products/product_types/`, requestOptions).then(handleResponse);
}

function getByProductId(productId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/products/product/`+productId, requestOptions).then(handleResponse);
}
function getByProductTypeId(productTypeId){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/products/`+productTypeId, requestOptions).then(handleResponse);
}
function addProduct(productData){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(productData)
    };
    return fetch(`/api/products/product`, requestOptions).then(handleResponse);
}
function updateProduct(productData){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(productData)
    };
    return fetch(`/api/products/product`, requestOptions).then(handleResponse);
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
            message.error("资源不存在！");
        }else if(response.status === 403){
            message.error("无权限！");
        }else if(response.status === 409){
            message.error("创建的记录已存在！");
        }
    // }else if(response.status === 201){
    //     message.success("创建成功！");
    }else{
        // message.success("刷新成功！");
        return response.text().then(text => {
            const data = text && JSON.parse(text);
            return data;
        })
    }
}
