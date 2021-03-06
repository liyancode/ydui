import { authHeader } from '../_helpers/authHeader';
import {message} from 'antd'
import {tokenExpired} from "../_helpers/tokenExpired";
export const contractService = {
    getAll,
    getOneItemById,
    getOneByContractId,
    addOneContract,
    updateOneContract,
    deleteOneContract,
};

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/contracts/by_user_name`, requestOptions).then(handleResponse);
}

function getOneItemById(id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/contracts/contract/by_id/`+id, requestOptions).then(handleResponse);
}
function getOneByContractId(contract_id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/orders/contracts/contract/`+contract_id, requestOptions).then(handleResponse);
}

function addOneContract(contract){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(contract)
    };
    return fetch(`/api/orders/contracts/contract`, requestOptions).then(handleResponse);
}

function updateOneContract(ask_price){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(ask_price)
    };
    return fetch(`/api/orders/contracts/contract`, requestOptions).then(handleResponse);
}

function deleteOneContract(contract_id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/api/orders/contracts/contract/`+contract_id, requestOptions).then(handleResponse);
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