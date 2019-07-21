const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");

const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);

const execQuery = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function() {
  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), {
      collection: this.mongooseCollection.name
    })
  );

  // see if cached
  const cachedData = await client.get(key);

  if (cachedData) {
    const doc = JSON.parse(cachedData);

    if (Array.isArray(doc)) {
      return doc.map(item => this.model(item));
    } else {
      return new this.model(doc);
    }
  }

  const result = await execQuery.apply(this, arguments);

  client.set(key, JSON.stringify(result));

  return result;
};
