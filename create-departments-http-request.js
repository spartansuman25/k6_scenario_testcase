import http from 'k6/http';
import { check, group } from 'k6';
import { Trend } from 'k6/metrics';

const uptimeTrendCheck = new Trend('/GET API uptime');
const departmentCreationTrend = new Trend('/POST Create a departments');


export let options = {
    stages: [
        //{ duration: '0.5m', target: 100}, // simulate ramp-up of traffic from 0 to 1000 users over 0.5 minutes.
         { duration: '0.5', target: 4 },
        // { duration: '0.5m', target: 0 }, // ramp-down to 0 users
    ],
};

export default function () {
    group('API uptime check', () => {
        const response = http.get('http://localhost:8082/api/departments');
        uptimeTrendCheck.add(response.timings.duration);
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
    });

    let departmentId;
    group('Create a Departments', () => {
        const response = http.post('http://localhost:8082/api/departments',
            {
                "title":"ddd",
                "description":"description",
                "published":"true"
            }
        );

        departmentCreationTrend.add(response.timings.duration);
        departmentId = response.json()._id;
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have Created Departments": res => res.json().completed === false,
        });
    })
}
