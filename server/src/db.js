const mongoose = require("mongoose");

const db = mongoose.connection;

async function connectionDB(url) {
  await mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}
db.once("open", () => {
  console.log(`[DB Connect] => [Succesfully]`);
});

db.on("error", () => {
  console.log("Error al Connectarse => [DB ERROR]");
});

module.exports = {
  connectionDB,
};
