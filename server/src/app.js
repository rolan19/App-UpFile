//Declarando
const express = require("express");
const path = require("path");
const router = require("./network/router");
const cors = require("cors");

//Inicializando
const app = express();

//config
const { config } = require("../config");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Rutas
app.get("/api", (req, res) => {
  res.status(200).json({
    files: `http://localhost:${config.api.port}/api/files`,
  });
});
router(app);

//static files
app.use("/uploads", express.static(path.resolve("uploads")));

module.exports = app;
