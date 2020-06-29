const express = require("express");
const router = express.Router();

const { list, get, create, update, eliminar } = require("./controller");

const multer = require("../../libs/upload");

router.route("/").get(list).post(multer.single("image"), create);

router
  .route("/:id")
  .get(get)
  .put(multer.single("image"), update)
  .delete(eliminar);

module.exports = router;
