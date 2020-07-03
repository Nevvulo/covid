import express from 'express';
const routes = require(`${__dirname}/routes`);
import * as secrets from './../secrets.json';

export default function createAPI () {
  return new Promise(resolve => {
    const app = express();
    // CORS
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://covid.nevulo.xyz');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Super-Properties, X-Context-Properties, X-Failed-Requests, If-None-Match');
      res.setHeader('Access-Control-Max-Age', '86400')
      next();
    });

    for (const route of Object.values(routes)) {
      route.call(this, app);
    }

    app.listen(secrets.WEB_PORT, () => {
      console.log(`Coronavirus tracker listening to port ${secrets.WEB_PORT}.`);
      resolve();
    });
  });
};

createAPI();