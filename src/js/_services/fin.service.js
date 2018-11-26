import { authHeader } from '../_helpers/authHeader';
import {message} from 'antd'
import {tokenExpired} from "../_helpers/tokenExpired";
export const finService = {
    getFinApprovalsByType,
    getFinApprovalsByTypeAndResult,
    getFinApprovalByFinApprovalID,
    addOneFinApproval,
    deleteOneFinApproval,
    updateOneFinApproval,
};
function getType(subPage){
    if(subPage.indexOf('ask_price')>0){
        return 'ask_price';
    }else if(subPage.indexOf('contract')>0){
        return 'contract';
    }else if(subPage.indexOf('order')>0){
        return 'order';
    }
}
function getFinApprovalsByType(type){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/fin/fin_approvals/type/`+getType(type), requestOptions).then(handleResponse);
}

/**
 * @param type: ask_price/contract
 * @param result:waiting/pass/no
 * @returns {Promise<Response>}
 */
function getFinApprovalsByTypeAndResult(type,result){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/fin/fin_approvals/type/`+getType(type)+`/result/`+result, requestOptions).then(handleResponse);
}

function getFinApprovalByFinApprovalID(fin_approval_id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/fin/fin_approval/`+fin_approval_id, requestOptions).then(handleResponse);
}

function addOneFinApproval(fin_approval){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(fin_approval)
    };
    return fetch(`/api/fin/fin_approval`, requestOptions).then(handleResponse);
}

function updateOneFinApproval(fin_approval){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(fin_approval)
    };
    return fetch(`/api/fin/fin_approval`, requestOptions).then(handleResponse);
}


function deleteOneFinApproval(fin_approval_id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`/api/fin/fin_approval/`+fin_approval_id, requestOptions).then(handleResponse);
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
            message.error("记录不存在！");
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
        if(response.status===201){
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