import http from 'k6/http';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status: 200}': ['p(95)<1000'],
        'http_req_duration{status: 201}': ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/3f4b5987-7c3e-4513-a927-8d2662ce01cf');
    http.get('https://run.mocky.io/v3/69ff4b1d-05bc-48bd-ba9a-db4db6fd9229?mocky-delay=2000ms');
}