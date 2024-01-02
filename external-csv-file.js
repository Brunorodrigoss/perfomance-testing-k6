// https://k6.io/docs/examples/data-parameterization/#from-a-csv-file
// https://www.papaparse.com/
import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const userCredentials = new SharedArray('user with credentials', function() {
    return papaparse.parse(open('./users.csv'), { header: true }).data;
});

export default function () {
    userCredentials.forEach((item) => console.log(item.username));
}