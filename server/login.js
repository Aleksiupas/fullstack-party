const express = require('express');
const app = express();
const https = require('https');
const qs = require('qs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (loginReq, loginRes) => {
  try {
    const data = qs.stringify({
      client_id: '67bc120c234be15f2aa5',
      client_secret: '2e4e5eceaae5232bfa0d66f1a6934bf7c6c0b044',
      code: loginReq.body.code,
    });

    const reqOptions = {
      host: 'github.com',
      port: '443',
      path: '/login/oauth/access_token',
      method: 'POST',
      headers: { 'content-length': data.length },
    };

    let body = '';

    const req = https.request(reqOptions, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => loginRes.send(qs.parse(body)));
    });

    req.write(data);
    req.end();
    req.on('error', (error) => loginRes.send(error));
  } catch (error) {
    loginRes.send(error);
  }
});

module.exports = app;
