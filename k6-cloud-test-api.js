import http from "k6/http"
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '60s', target: 10 },
        { duration: '10s', target: 0 }
    ],

    thresholds: {
        http_req_duration: ['p(90)<1250', 'p(95)<1300'],
        checks: ['rate>0.99']
    },

    ext: {
        loadimpact: {
            projectID: 3675844
        }
    }
}

export default function() {

    const credentials = {
        username: 'test_' + randomString(8),
        password: 'secret_' + randomString(8)
    }
    
    let res = http.post(
        'https://test-api.k6.io/user/register/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            },
            tags: {
                name: 'registerUserURL'
            }
        }
    );

    check(res, {
        'status is 201': (value) => value.status === 201,
        'username': (value) => value.json().username === credentials.username
    });

    sleep(randomIntBetween(0, 5));

    res = http.post(
        'https://test-api.k6.io/auth/token/login/',
        JSON.stringify(credentials),
        {
            headers: {
                'Content-Type': 'application/json'
            },
            tags: {
                name: 'loginURL'
            }
        }
    );

    const accessToken = res.json().access;

    check(res, {
        'status is 200': (value) => value.status === 200,
        'has token': (value) => value.json().access !== undefined
    });

    sleep(randomIntBetween(0, 5));

    res = http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            tags: {
                name: 'getMycrocodilesURL'
            }
        }
    );

    check(res, {
        'status is 200': (value) => value.status === 200,
        'has no crocodiles': (value) => value.json().length === 0
    });

    sleep(randomIntBetween(0, 5));

    res = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify(
            {
                name: 'Random croc',
                sex: 'M',
                date_of_birth: '1900-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            tags: {
                name: 'createNewCrocodileURL'
            }
        }
    );

    const newCrocodileId = res.json().id;

    sleep(randomIntBetween(0, 5));

    res = http.get(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            tags: {
                name: 'getCrocodileURL'
            }
        }
    );

    check(res, {
        'status is 200': (value) => value.status === 200,
        'crocodile id': (value) => value.json().id === newCrocodileId
    });

    sleep(randomIntBetween(0, 5));

    const updatedCrocName = 'Updated Random croc'

    res = http.put(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                name: updatedCrocName,
                sex: 'M',
                date_of_birth: '1990-10-28'
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            tags: {
                name: 'putCrocodileURL'
            }
        }
    );

    check(res, {
        'status is 200': (value) => value.status === 200,
        'crocodile name': (value) => value.json().name === updatedCrocName
    });

    sleep(randomIntBetween(0, 5));

    res = http.patch(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        JSON.stringify(
            {
                sex: 'F', 
            }
        ),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            },
            tags: {
                name: 'patchCrocodileURL'
            }
        }
    );

    check(res, {
        'status is 200': (value) =>  value.status === 200,
        'crocodile sex': (value) => value.json().sex === 'F'
    });

    sleep(randomIntBetween(0, 5));

    res = http.del(
        `https://test-api.k6.io/my/crocodiles/${newCrocodileId}/`,
        null,
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            tags: {
                name: 'deleteCrocodileURL'
            }
        }
    );

    check(res, {
        'status is 204': (value) => value.status === 204
    });

    sleep(randomIntBetween(0, 5));
}