// "authorityHash": {
//     "hr": "rw",
//         "order": "n",
//         "crm": "n",
//         "fin": "n",
//         "product": "n",
//         "warehouse": "n"
// }
export function authorityHash() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.authorityHash) {
        return user.authorityHash;
    } else {
        return {};
    }
}