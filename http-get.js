import http from 'k6/http';
import { check } from 'k6';

export default function () {
    let res = http.get('https://test-api.k6.io/public/crocodiles/');
    const crocodiles = res.json();

    const crocodileId = crocodiles[0].id;
    const crocodileName = crocodiles[0].name;

    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    // console.log(res.json().name);
    // console.log(res.headers);
    // console.log(res.headers.Allow);
    console.log(res.headers['Content-Type']);

    check(res, {
        'status is 200': (value) => value.status === 200,
        'Crocodile name check': (value) => value.json().name === crocodileName
    }
    );
}