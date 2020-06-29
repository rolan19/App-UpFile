const express = require("express");

//Rutas de components
const files = require("../components/files/network");

async function routes(app) {
  app.use("/api/files", files);
}

module.exports = routes;
