import { authHeader } from '../_helpers/auth-header';
import {message} from 'antd'
export const userService = {
    login,
    logout,
    // register,
    getAll,
    // getById,
    getUserByUsername
    // update,
    // delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded','Accept':'application/json' },
        // headers: { 'Content-Type': 'application/json' },
        // credentials: 'same-origin',
        // mode: 'no-cors',
        body: "username="+username+"&password="+password
    };

    return fetch(`/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                console.log(user);
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('user_name', username);
                window.location.replace('/')
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    window.location.replace('/#/login')
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

    return fetch(`/api/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                message.error("用户名或密码错误！");
                logout();
            }else if(response.status === 500){
                message.error("错误，请稍后再试！");
            }else if(response.status === 404){
                message.error("用户名不存在！");
            }else if(response.status === 403){
                message.error("无权限！");
            }
            //
            // const error = (data && data.message) || response.statusText;
            // return Promise.reject(error);

        }

        return data;
    });
}