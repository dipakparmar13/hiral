const mongoose = require("mongoose");
const config = require("../utils/config");

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(config.mongoDb.host, {
      useNewUrlParser: true,
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
module.exports = InitiateMongoServer;
