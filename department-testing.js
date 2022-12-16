import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
    stages: [
        { duration: '0.5m', target: 3 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        // { duration: '0.5m', target: 4 }, // stay at 100 users for 10 minutes
        // { duration: '0.5m', target: 0 }, // ramp-down to 0 users
    ],
};

export default function () {
    group('API uptime check', () => {
        const response = http.get('http://localhost:8082/api/departments');
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
    });

    let departmentId;
    group('Create a Departments', () => {
        const response = http.post('http://localhost:8082/api/departments',
            {
                "title":"test",
                "description":"description",
                "published":"true"
            }
        );

        departmentId = response.json()._id;
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have created Departments": res => res.json().completed === false,
        });
    })

    group('Get a Department ', () => {
        const response = http.get('http://localhost:8082/api/departments'
        );
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have the created Department": res => res.json()[0]._id === departmentId,
        });

        check(response, {
            "response should have the correct state": res => res.json()[0].completed === false,
        });
    })
}
