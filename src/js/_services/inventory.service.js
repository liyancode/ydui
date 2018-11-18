import { authHeader } from '../_helpers/authHeader';
import {message} from 'antd'
import {tokenExpired} from "../_helpers/tokenExpired";
export const invenrotyService = {
    getAll,
    getOneByInventoryId,
    addOneInvenroty,
    deleteOneInvenroty,
    updateOneInvenroty,
    getAllSubTypes,
    getAllByTypeID,
    getAllByTypeParent,
};

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/inventories/`, requestOptions).then(handleResponse);
}

//all sub types of a type_parent --原料rw raw_material、半成品sfp semifinished_product、成品fp product
/**
 * @param type_parent: rm/sfp/fp
 */
function getAllSubTypes(type_parent){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/inventories/inventory_types/type_parent/`+type_parent, requestOptions).then(handleResponse);
}

function getAllByTypeID(type_id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/api/inventories/inventory_type_id/`+type_id, requestOptions).then(handleResponse);
}

/**
 * @param type_parent: rm/sfp/fp
 */
function getAllByTypeParent(type_parent){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/api/inventories/type_parent/`+type_parent, requestOptions).then(handleResponse);
}

function getOneByInventoryId(inventory_id){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/inventories/inventory/`+inventory_id, requestOptions).then(handleResponse);
}

function addOneInvenroty(inventory){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(inventory)
    };
    return fetch(`/api/inventories/inventory`, requestOptions).then(handleResponse);
}

function updateOneInvenroty(inventory){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(inventory)
    };
    return fetch(`/api/inventories/inventory`, requestOptions).then(handleResponse);
}


function deleteOneInvenroty(inventory_id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`/api/inventories/inventory/`+inventory_id, requestOptions).then(handleResponse);
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