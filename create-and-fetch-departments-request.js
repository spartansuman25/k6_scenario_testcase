import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
    stages: [
        { duration: '5m', target: 1000 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
        // { duration: '0.5m', target: 100 }, // stay at 100 users for 10 minutes
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
    let departmentsID;

/*
    group('Create Departments', () => {
        const response = http.post('http://localhost:8082/api/departments',

            {
                "title":"test",
                "description":"description",
                "published":"true"
            },


        );

        departmentsID = response.json()._id;
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have created departments": res => res.json().completed === false,
        });
    })
*/

    group('Fetch and create departments', () => {
        const response = http.get(`http://localhost:8082/api/departments/`
        );
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have the created department": res => res.json()[0] === departmentsID,
        });
        console.log(JSON.stringify(response.json()[0]));

        check(response, {
            "response should have the correct state": res => res.json()[0] === false,
        });
    })
}
