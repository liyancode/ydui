import {authHeader} from '../_helpers/authHeader';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export const service_Util_ = {
    common_Post_,
    common_Delete_,
    common_Put_,
    common_Get_,
}

function common_Post_(path, body) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(body)
    };
    return fetch(path, requestOptions);
}

function common_Delete_(path, key) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(path + key, requestOptions);
}

function common_Put_(path, body) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(body)
    };
    return fetch(path, requestOptions)
}

function common_Get_(path, key) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(path + key, requestOptions);
}