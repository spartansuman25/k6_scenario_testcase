[![CircleCI](https://circleci.com/gh/mwaz/http-request-testing-with-k6.svg?style=svg)](https://circleci.com/gh/mwaz/http-request-testing-with-k6)

<p align="center"><img src="https://avatars3.githubusercontent.com/u/59034516"></p>


## Running tests
### Running ENV specific Tests: 
 To run environment specific tests, we will use the following commands.

1. For DEV environment tests: 
```bash
k6 run scenario-tests/todos-development-tests.js
```

2. For STAGING environment tests: 
```bash
k6 run scenario-tests/todos-staging-tests.js
```

### Running Normal API Tests:

```bash
k6 run todos-testing.js
```
## Details

This repo is built following a tutorial published on CircleCI blog under the CircleCI Guest Writer Program.

- Blog post: [HTTP request testing with k6][blog]
- Author's GitHub profile: [Waweru Mwaura][author]

### About CircleCI Guest Writer Program

Join a team of freelance writers and write about your favorite technology topics for the CircleCI blog. Read more about the program [here][gwp-program].

Reviewers: [Ron Powell][ron], [Stanley Ndagi][stan]


[blog]: https://circleci.com/blog/http-request-testing-with-k6/
[author]: https://github.com/mwaz

[gwp-program]: https://circle.ci/3ahQxfu
[ron]: https://github.com/ronpowelljr
[stan]: https://github.com/NdagiStanley