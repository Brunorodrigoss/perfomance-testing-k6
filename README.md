good latency => below 300ms
http_req_duration = > Percentyle

Test sequence: Smoke -> Load -> Stress

Smoke Test => Verifies the basic funcionality of an application without goin in-depth

Load Test => Measure the system's performance under expected load (typical work day)

Stress Test => Assesses the application's behaviour under heavier than unusual or peak load conditions

Spike Test => To simulate a scenario where an application experiences a sudden and enormous increase in users, way beyond its normal traffic, without a significant ramp-up time. This test evaluates the system's ability to handle such abrupt load and how it recovers from it.

Breakpoint Test => Determine the maximum capacity the application

Soak Test => Load Test with duration 12-24 hours or longer. Used to identify issues like memory leak and resource depletion that may only appear after prolonged periods of continuous use

https://designer.mocky.io/

https://test-api.k6.io/

k6 run file-name.js
k6 run --http-debug file-name.js
k6 run --http-debug="full" file-name.js


k6 run -e BASE_URL=https://test-api.k6.io environment-variables.js


https://grafana.com/products/cloud/k6/
k6 login cloud --token YOURGRAFANAK6TOKENHERE
k6 cloud k6-clould.js
k6 run k6-cloud.js -o cloud

k6 run first-script.js --vus 1 --duration 10s --iteration 1
k6 run first-script.js --u 1 --d 10s --i 1

https://badssl.com/

k6 run insecure-request.js --insecure-skip-tls-verify

k6 run first-script.js --out json=full_results.json

https://k6.io/docs/using-k6/k6-options/how-to/
https://k6.io/docs/using-k6/k6-options/reference/