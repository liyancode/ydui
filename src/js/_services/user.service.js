import { authHeader } from '../_helpers/authHeader';
import {message} from 'antd'
export const userService = {
    login,
    logout,
    // register,
    addUser,
    getAll,
    updateUser,
    getUserByUsername,
    // update,
    deleteUser
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded','Accept':'application/json' },
        body: "username="+username+"&password="+password
    };

    return fetch(`/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            try{
                if (user.token) {
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('user_name', username);
                    window.location.replace('/')
                }

                return user;
            }catch(e){
                console.log(e);
                return null;
            }
        });
}

function logout() {
    localStorage.removeItem('user');
    window.location.replace('/#/login')
}

function addUser(userData){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(userData)
    };
    return fetch(`/api/users/user`, requestOptions).then(handleResponse);
}

function updateUser(userData){
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(userData)
    };
    return fetch(`/api/users/user`, requestOptions).then(handleResponse);
}

function deleteUser(user_id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`/api/users/`+user_id, requestOptions).then(handleResponse);
}

function getUserByUsername(user_name){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/users/`+user_name, requestOptions).then(handleResponse);
}
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/users/all_users/`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
        if (!response.ok) {
            if (response.status === 401) {
                // auto tokenExpired if 401 response returned from api
                message.error("用户名或密码错误！");
                logout();
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
                const data = text && JSON.parse(text);
                return data;
            });

        }
}