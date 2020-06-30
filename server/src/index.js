const app = require("./app");
const { config } = require("../config");
const { connectionDB } = require("./db");
const chalk = require("chalk");

console.log(`
Hola que tal esta es una api acerca de subida de Imagenes:
 > Los comandos que puedes usar:
    1. npm start
    2. npm run dev
`);
async function main() {
  await connectionDB(config.api.url);

  await app.listen(config.api.port, () => {
    console.log(chalk.bold.blue(`http://localhost:${config.api.port}`));
  });
}

main();
