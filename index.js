process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster')

if(cluster.isMaster){
  cluster.fork();
}else{
  const express = require("express");
  const app = express();
  const crypto = require("crypto");

  app.get("/", (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
      res.send("Hi there");
    });
  });

  app.listen(3000);
}