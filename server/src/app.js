//Declarando
const express = require("express");
const path = require("path");
const router = require("./network/router");
const cors = require("cors");

//Inicializando
const app = express();

//config
const { config } = require("../config");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

app.get("/api/upload", (req, res) => {
  res.render("index");
});

//static files
app.use("/uploads", express.static(path.resolve("uploads")));

module.exports = app;
