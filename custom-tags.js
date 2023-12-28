import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { check, sleep } from 'k6';

export const options = {
    thresholds: {
        'http_req_duration{page:order}': ['p(95)<300'],
        http_errors: ['count==0'],
        'http_errors{page:order}': ['count==0'],
        checks: ['rate>=0.99'],
        'checks{page:order}': ['rate>=0.99'],
    }
}

let httpErrors = new Counter('http_errors');

export default function () {
    let res = http.get(
        'https://run.mocky.io/v3/3f4b5987-7c3e-4513-a927-8d2662ce01cf',
        {
            tags:  {
                page: 'order'
            }
        }
    );

    if (res.error) {
        httpErrors.add(1, { page: 'order' });
    }

    check(res, {
        'status is 200': (value) => value.status === 200
    }, { page: 'order'});

    res = http.get('https://run.mocky.io/v3/69ff4b1d-05bc-48bd-ba9a-db4db6fd9229?mocky-delay=2000ms');

    if (res.error) {
        httpErrors.add(1);
    }

    check(res, {
        'status is 201': (value) => value.status === 201
    });

    sleep(1);
}