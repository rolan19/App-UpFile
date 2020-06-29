require("dotenv").config();
module.exports = {
  config: {
    api: {
      port: process.env.PORT || 3000,
      url: process.env.MONGO_URL || "mongodb://localhost/upload-local",
    },
  },
};
