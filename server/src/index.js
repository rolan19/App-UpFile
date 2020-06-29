const app = require("./app");
const { config } = require("../config");
const { connectionDB } = require("./db");

async function main() {
  await connectionDB(config.api.url);

  await app.listen(config.api.port, () => {
    console.log(`http://localhost:${config.api.port}`);
  });
}

main();
