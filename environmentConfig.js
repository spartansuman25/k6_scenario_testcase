export function developmentConfig(filename) {
    let envConfig = {
      BASE_URL: "http://localhost:8082/api/departments",
      ENV: "DEVELOPMENT",
    };
    return Object.assign({}, envConfig, filename);
  }
  
  export function stagingConfig(filename) {
    let envConfig = {
      BASE_URL: "http://localhost:8082/api/departments",
      ENV: "STAGING",
    };
    return Object.assign({}, envConfig, filename);
  }
  