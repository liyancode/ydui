import {authHeader} from '../_helpers/authHeader';
import {message} from 'antd'

require('es6-promise').polyfill();
require('isomorphic-fetch');
import {service_Util_} from "./service._util_";
import {tokenExpired} from "../_helpers/tokenExpired";

export const serviceWarehouse = {
    //wh_raw_material
    addWHRawMaterial,
    updateWHRawMaterial,
    getWHRawMaterialById,
    getWHRawMaterialByWhIdSub,
    getWHRawMaterialAll,

    //wh_raw_material_history
    addWHRawMaterialHistory,
    updateWHRawMaterialHistory,
    getWHRawMaterialHistoryById,
    getWHRawMaterialHistoryListByWhIdType,
    getWHRawMaterialHistoryListByRecordType,
    getWHRawMaterialHistoryListByWhIdSub,
    getWHRawMaterialHistoryAll,

    //wh_inventory
    addWHInventory,
    updateWHInventory,
    getWHInventoryByInventoryId,
    getWHInventoryListByInventoryType,

    //wh_inventory_batch
    addWHInventoryBatch,
    updateWHInventoryBatch,
    getWHInventoryBatchByInventoryBatchId,
    getWHInventoryBatchListByInventoryBatchType,
    getWHInventoryBatchListByInventoryId,
    getWHInventoryBatchListByBatchType,
    //wh_inventory_history
    getWHInventoryHistoryByHistoryId,
    getWHInventoryHistoryListByInventoryId,
};


const apiPrefix = '/api/service/warehouse';

//user_account
function addWHRawMaterial(body) {
    return service_Util_.common_Post_(apiPrefix + '/wh_raw_material', body).then(handleResponse);
}

function updateWHRawMaterial(body) {
    return service_Util_.common_Put_(apiPrefix + `/wh_raw_material`, body).then(handleResponse);
}

function getWHRawMaterialById(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material/`, key).then(handleResponse);
}

function getWHRawMaterialByWhIdSub(wh_id_sub) {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material/by_wh_id_sub/`, wh_id_sub).then(handleResponse);
}

function getWHRawMaterialAll() {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material/list/all/`, '').then(handleResponse);
}

//wh_raw_material_history
function addWHRawMaterialHistory(body) {
    return service_Util_.common_Post_(apiPrefix + '/wh_raw_material_history', body).then(handleResponse);
}

function updateWHRawMaterialHistory(body) {
    return service_Util_.common_Put_(apiPrefix + `/wh_raw_material_history`, body).then(handleResponse);
}

function getWHRawMaterialHistoryById(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material_history/`, key).then(handleResponse);
}

function getWHRawMaterialHistoryListByWhIdType(wh_id,type) {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material_history/list/by_wh_id_and_type/?wh_id=`+wh_id+`&type=`+type, '').then(handleResponse);
}

function getWHRawMaterialHistoryListByWhIdSub(wh_id_sub) {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material_history/list/by_wh_id_sub/`, wh_id_sub).then(handleResponse);
}

function getWHRawMaterialHistoryListByRecordType(recordType) {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material_history/list/by_record_type/`, recordType).then(handleResponse);
}

function getWHRawMaterialHistoryAll() {
    return service_Util_.common_Get_(apiPrefix + `/wh_raw_material_history/list/all/`, '').then(handleResponse);
}

//wh_inventory
function addWHInventory(body) {
    return service_Util_.common_Post_(apiPrefix + '/wh_inventory', body).then(handleResponse);
}

function updateWHInventory(body) {
    return service_Util_.common_Put_(apiPrefix + `/wh_inventory`, body).then(handleResponse);
}

function getWHInventoryByInventoryId(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory/`, key).then(handleResponse);
}

function getWHInventoryListByInventoryType(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory/list/by_wh_inventory_type/`, key).then(handleResponse);
}

//wh_inventory_batch
function addWHInventoryBatch(body) {
    return service_Util_.common_Post_(apiPrefix + '/wh_inventory_batch', body).then(handleResponse);
}

function updateWHInventoryBatch(body) {
    return service_Util_.common_Put_(apiPrefix + `/wh_inventory_batch`, body).then(handleResponse);
}

function getWHInventoryBatchByInventoryBatchId(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory_batch/`, key).then(handleResponse);
}

function getWHInventoryBatchListByInventoryBatchType(wh_inventory_type,batch_type) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory_batch/list/by_wh_inventory_type_batch_type/?wh_inventory_type=`+wh_inventory_type+`&batch_type=`+batch_type, '').then(handleResponse);
}

function getWHInventoryBatchListByBatchType(batch_type) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory_batch/list/by_batch_type/`, batch_type).then(handleResponse);
}

function getWHInventoryBatchListByInventoryId(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory_batch/list/by_wh_inventory_id/`, key).then(handleResponse);
}

//     //wh_inventory_history
function getWHInventoryHistoryByHistoryId(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory_history/`, key).then(handleResponse);
}

function getWHInventoryHistoryListByInventoryId(key) {
    return service_Util_.common_Get_(apiPrefix + `/wh_inventory_history/list/by_wh_inventory_id/`, key).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto tokenExpired if 401 response returned from api
            // message.error("用户名或密码错误！");
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