import http from 'k6/http';
import { check, group } from 'k6';
import { developmentConfig } from '../environmentConfig.js';

export const options = {
    scenarios: {
      example_scenario: {
        env: developmentConfig(),
        executor: 'shared-iterations',
        vus: 1
      }
    }
  };

export default function () {
    group('API uptime check - development', () => {
        const response = http.get(`${__ENV.BASE_URL}`);
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
    });

    let departmentId;
    group('Create a Departments', () => {
        const response = http.post(`${__ENV.BASE_URL}`,
            {
                "title":"test",
                "description":"description",
                "published":"true"
            }      );
        departmentId = response.json()._id;
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have created Department": res => res.json().completed === false,
        });
    })

     group('get a department', () => {
        const response = http.get(`${__ENV.BASE_URL}${departmentId}`
        );
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have the created department": res => res.json()[0]._id === departmentId,
        });
        console.log(JSON.stringify(response.json()[0]));

        check(response, {
            "response should have the correct state": res => res.json()[0].completed === false,
        });
    })

    group('delete all employee', () => {
        let response = http.del(`${__ENV.BASE_URL}`
        );

        check(response, {
            "status code should be 200": res => res.status === 200,
        });
    })
}
