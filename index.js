const express = require("express");
const app = express();
const crypto = require("crypto");
const Worker = require("webworker-threads").Worker;

app.get("/pbkdf2", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("Hi there");
  });
});

app.get("/worker-thread", (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = () => {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      this.postMessage(counter);
    };
  });

  worker.onmessage = message => {
    res.send("" + message.data);
  };

  worker.postMessage();
});

app.listen(3000);
