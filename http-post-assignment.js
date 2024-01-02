import http from 'k6/http';
import { check } from 'k6';

//
// List crocodiles into private API using Bearer token
//
export function setup(){
    const credentials = {
        username: 'user_' + Date.now(),
        password: 'passwd' + Date.now()
    }

    const body = JSON.stringify(credentials);

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let res = http.post('https://test-api.k6.io/user/register/', body, params);
    const data = res.json();

    check(res, {'status is 201': (value) => value.status === 201 })
    
    return credentials;
}

export default function (data) {

    const body = JSON.stringify({
        username: data.username,
        password: data.password
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let res = http.post('https://test-api.k6.io/auth/token/login/', body, params);

    check(res, {'status is 200': (value) => value.status === 200});

    const accessToken = res.json().access;
    console.log(`Access Token = ${accessToken}`);

    http.get('https://test-api.k6.io/my/crocodiles/',
    {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    check(res, {'status is 200': (value) => value.status === 200});
}