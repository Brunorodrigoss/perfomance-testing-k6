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
