const mongoose = require("mongoose");

const execQuery = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = function() {
  console.log("CUSTOM");
  return execQuery.apply(this, arguments);
};
