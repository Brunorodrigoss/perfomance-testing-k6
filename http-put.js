import http from 'k6/http';
import { check } from 'k6';

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
    
    const access = res.json().access;

    res = http.post('https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Bruno',
                sex: 'M',
                date_of_birth: '1992-05-07'
            }
        ),  
        {
            headers: {
                Authorization: 'Bearer ' + access,
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'setup - create crocodile - status code is 201': (value) => value.status === 201,
        'setup - create crocodile - check id': (value) => value.json().id > 0,
        'setup - create crocodile - check response name': (value) => value.json().name === 'Bruno',
        'setup - create crocodile - check response sex': (value) => value.json().sex === 'M',
        'setup - create crocodile - check date_of_birth': (value) => value.json().date_of_birth === '1992-05-07'

    });

    return {
        id:res.json().id,
        access: access 
    };
}

export default function (data) {
    
    const newCrocodileId = data.id;

    console.log(`My crocodile ID is: ${newCrocodileId}`);

    let res = http.get(`https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,  
        {
            headers: {
                Authorization: 'Bearer ' + data.access,
                'Content-Type': 'application/json'
            }
        }
    );

    check(res, {
        'status code is 200': (value) => value.status === 200,
        'check crocodile ID': (value) => value.json().id === newCrocodileId
    });

    console.log(res.json());

    res = http.put(`https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                name: 'Bruno Update 2',
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

    console.log(res.json());
}