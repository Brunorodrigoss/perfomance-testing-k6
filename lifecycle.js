import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 1,
    duration: '5s'
}

console.log('-- init stage --');

export function setup() {
    console.log('-- setup stage --');
    sleep(5);
    const data = { foo: 'bar' };
    return data
}

export default function (data) {
    console.log('-- VU stage --');
    //console.log(data);
    sleep(2);
}

export function teardown() {
    console.log('-- teardown stage --')
}
