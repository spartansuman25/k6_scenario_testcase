import http from 'k6/http';
import { check, group } from 'k6';
import { stagingConfig } from '../environmentConfig.js';

export const options = {
    scenarios: {
      example_scenario: {
        env: stagingConfig(),
        executor: 'shared-iterations',
      }
    }
  };

export default function () {
    group('API uptime check - Staging', () => {
        const response = http.get(`${__ENV.BASE_URL}`);
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
    });

    let todoID;
    group('Create a Department', () => {
        const response = http.post(`${__ENV.BASE_URL}`,
            {
                "title":"test",
                "description":"description",
                "published":"true"
            }
        );
        todoID = response.json()._id;
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have created department": res => res.json().completed === false,
        });
    })

     group('get a department item', () => {
        const response = http.get(`${__ENV.BASE_URL}${todoID}`
        );
        check(response, {
            "status code should be 200": res => res.status === 200,
        });
        check(response, {
            "response should have the created todo": res => res.json()[0]._id === todoID,
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
