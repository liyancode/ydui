import {authHeader} from '../_helpers/authHeader';
import {message} from 'antd'

require('es6-promise').polyfill();
require('isomorphic-fetch');
import {service_Util_} from "./service._util_";

export const serviceUser = {
    login,
    logout,
    //user_account
    addUserAccount,
    deleteUserAccountByUsername,
    updateUserAccount,
    getUserAccountByUsername,
    updateUserAccountPassword,
    checkUsernameAvailable,
    //user_authority
    addUserAuthority,
    deleteUserAuthorityByAuthority,
    updateUserAuthority,
    getUserAccountByAuthority,
    //user_department
    addUserDepartment,
    deleteUserDepartmentByDepartmentId,
    updateUserDepartment,
    getUserDepartmentByDepartmentId,
    getAllUserDepartment,
    //user_employee_info
    addUserEmployeeInfo,
    deleteUserEmployeeInfoByUsername,
    updateUserEmployeeInfo,
    getUserEmployeeInfoByUsername,
    //user_private_info
    addUserPrivateInfo,
    deleteUserPrivateInfoByUsername,
    updateUserPrivateInfo,
    getUserPrivateInfoByUsername,

    //user_application
    addUserApplication,
    deleteUserApplicationByApplicationId,
    updateUserApplication,
    getUserApplicationByApplicationId,
    getUserApplicationListByUsername,
    getUserApplicationListByApproveBy,

    //list
    getUserListByDepartmentId,
    getUserListForAdmin,

    addUserAccountEmployeePrivateInfo,
    updateUserAccountEmployeePrivateInfo,
    getUserFullInfoByUsername,

};


const apiPrefix = '/api/service/user';

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'},
        body: "username=" + username + "&password=" + password
    };
    return fetch(`/api/service/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            try {
                if (user.token) {
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('user_name', username);
                    window.location.replace('/')
                }
                return user;
            } catch (e) {
                console.log(e);
                return null;
            }
        });
}

function logout() {
    localStorage.removeItem('user');
    window.location.replace('/#/login')
}

//user_account
function addUserAccount(body) {
    return service_Util_.common_Post_(apiPrefix + '/user_account', body).then(handleResponse);
}

function deleteUserAccountByUsername(key) {
    return service_Util_.common_Delete_(apiPrefix + `/user_account/`, key).then(handleResponse);
}

function updateUserAccount(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_account`, body).then(handleResponse);
}

function getUserAccountByUsername(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_account/`, key).then(handleResponse);
}

function updateUserAccountPassword(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_account/password`, body).then(handleResponse);
}

function checkUsernameAvailable(userName) {
    return service_Util_.common_Get_(apiPrefix + `/user_account/check_user_name/un/`, userName).then(handleResponse);
}

//user_authority
function addUserAuthority(body) {
    return service_Util_.common_Post_(apiPrefix + '/user_authority', body).then(handleResponse);
}

function deleteUserAuthorityByAuthority(key) {
    return service_Util_.common_Delete_(apiPrefix + `/user_authority/`, key).then(handleResponse);
}

function updateUserAuthority(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_authority`, body).then(handleResponse);
}

function getUserAccountByAuthority(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_authority/`, key).then(handleResponse);
}

//user_department
function addUserDepartment(body) {
    return service_Util_.common_Post_(apiPrefix + '/user_department', body).then(handleResponse);
}

function deleteUserDepartmentByDepartmentId(key) {
    return service_Util_.common_Delete_(apiPrefix + `/user_department/`, key).then(handleResponse);
}

function updateUserDepartment(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_department`, body).then(handleResponse);
}

function getUserDepartmentByDepartmentId(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_department/`, key).then(handleResponse);
}

function getAllUserDepartment() {
    return service_Util_.common_Get_(apiPrefix + `/user_department/all/`, '').then(handleResponse);
}


//user_employee_info
function addUserEmployeeInfo(body) {
    return service_Util_.common_Post_(apiPrefix + '/user_employee_info', body).then(handleResponse);
}

function deleteUserEmployeeInfoByUsername(key) {
    return service_Util_.common_Delete_(apiPrefix + `/user_employee_info/`, key).then(handleResponse);
}

function updateUserEmployeeInfo(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_employee_info`, body).then(handleResponse);
}

function getUserEmployeeInfoByUsername(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_employee_info/`, key).then(handleResponse);
}

//user_private_info
function addUserPrivateInfo(body) {
    return service_Util_.common_Post_(apiPrefix + '/user_private_info', body).then(handleResponse);
}

function deleteUserPrivateInfoByUsername(key) {
    return service_Util_.common_Delete_(apiPrefix + `/user_private_info/`, key).then(handleResponse);
}

function updateUserPrivateInfo(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_private_info`, body).then(handleResponse);
}

function getUserPrivateInfoByUsername(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_private_info/`, key).then(handleResponse);
}

//user_application
function addUserApplication(body) {
    return service_Util_.common_Post_(apiPrefix + '/user_application', body).then(handleResponse);
}

function deleteUserApplicationByApplicationId(key) {
    return service_Util_.common_Delete_(apiPrefix + `/user_application/`, key).then(handleResponse);
}

function updateUserApplication(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_application`, body).then(handleResponse);
}

function getUserApplicationByApplicationId(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_application/`, key).then(handleResponse);
}

function getUserApplicationListByUsername(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_application/list/by_user_name/`, key).then(handleResponse);
}

function getUserApplicationListByApproveBy(key) {
    return service_Util_.common_Get_(apiPrefix + `/user_application/list/by_approve_by/`, key).then(handleResponse);
}

//list
function getUserListByDepartmentId(departmentId) {
    return service_Util_.common_Get_(apiPrefix + `/list/by_department_id/`, departmentId).then(handleResponse);
}

function getUserListForAdmin() {
    return service_Util_.common_Get_(apiPrefix + `/list/for_admin`, '').then(handleResponse);
}

function addUserAccountEmployeePrivateInfo(body) {
    return service_Util_.common_Post_(apiPrefix + '/user_account_employee_private_info', body).then(handleResponse);
}

function updateUserAccountEmployeePrivateInfo(body) {
    return service_Util_.common_Put_(apiPrefix + `/user_account_employee_private_info`, body).then(handleResponse);
}

function getUserFullInfoByUsername(userName) {
    return service_Util_.common_Get_(apiPrefix + `/full_info/`, userName).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 401) {
            // auto tokenExpired if 401 response returned from api
            message.error("用户名或密码错误！");
            logout();
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