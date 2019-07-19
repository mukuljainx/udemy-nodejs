const https = require('https');

const start = Date.now();

https.request("https://www.google.co.in", res => {
  res.on('data', () => {
  })
  res.on("end", () => {
    console.log("time: ", Date.now() - start);
  });
}).end();