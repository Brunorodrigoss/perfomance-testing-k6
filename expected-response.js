import http from 'k6/http';
import { sleep, group, check } from 'k6';

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{expected_response:true}': ['p(95)<1000'],
        'group_duration{group:::Main page}': ['p(95)<3000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<1000'],
        'group_duration{group:::News page}': ['p(95)<1000'],
    }
}

export default function () {

    group('Main page', function (){
        let res = http.get('https://run.mocky.io/v3/fe95a86b-0418-4047-ba58-b8949c3f9b21?mocky-delay=900ms');
        check(res, { 'status is 200': (value) => value.status === 200 });

        group('Assets', function (){
            http.get('https://run.mocky.io/v3/fe95a86b-0418-4047-ba58-b8949c3f9b21?mocky-delay=900ms');
            http.get('https://run.mocky.io/v3/fe95a86b-0418-4047-ba58-b8949c3f9b21?mocky-delay=900ms');
        });
    });

    group('News page', function (){
        let res = http.get('https://run.mocky.io/v3/d93ddea1-2b7e-4291-9fbe-6876deffd473');
    });

    sleep(1);
}