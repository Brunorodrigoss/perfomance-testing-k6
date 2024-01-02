import http from 'k6/http';
import { check } from 'k6';

//
// Add a new crocodile into private API using Bearer token
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
    check(res, {'setup - register - status is 201': (value) => value.status === 201 });

    res = http.post('https://test-api.k6.io/auth/token/login/', body, params);
    check(res, {'setup - login - status is 200': (value) => value.status === 200 });
    
    return res.json();
}

export default function (data) {
    const res = http.post('https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Bruno',
                sex: 'M',
                date_of_birth: '1992-05-07'
            }
        ),  
        {
            headers: {
                Authorization: 'Bearer ' + data.access,
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status code is 201': (value) => value.status === 201,
        'check id': (value) => value.json().id > 0,
        'check response name': (value) => value.json().name === 'Bruno',
        'check response sex': (value) => value.json().sex === 'M',
        'check date_of_birth': (value) => value.json().date_of_birth === '1992-05-07'

    });
}