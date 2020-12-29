export const envVars = {
  port: process.env.EXPRESS_PORT,
  MONGOATLAS_USER: process.env.MONGOATLAS_USER,
  MONGOATLAS_PASSWORD: process.env.MONGOATLAS_PASSWORD,
  MONGOATLAS_DB: process.env.MONGOATLAS_DB,
};

//If not using typescript
// module.exports = {
//     endpoint: process.env.API_URL,
//     masterKey: process.env.API_KEY,
//     port: process.env.PORT
//   };
