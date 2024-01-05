// https://k6.io/docs/using-k6/k6-options/reference/#insecure-skip-tls-verify
// Use k6 run insecure-request.js --insecure-skip-tls-verify
import http from "k6/http";
import { sleep } from 'k6';

export default function() {
    http.get('https://self-signed.badssl.com/')
    sleep(1);
}