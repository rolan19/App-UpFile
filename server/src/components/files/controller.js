const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const fileModel = require("./model");
const response = require("../../network/response");

async function getFiles(req, res) {
  try {
    const getFiles = await fileModel.find();
    response.success(req, res, getFiles, 200);
  } catch (err) {
    response.error(
      req,
      res,
      err,
      500,
      chalk.bold.red("Error de GET FILE CONTROLLER")
    );
  }
}

async function getFile(req, res) {
  try {
    const { id } = req.params;
    const getFile = await fileModel.findOne({ _id: id });
    response.success(req, res, getFile, 200);
  } catch (err) {
    response.error(
      req,
      res,
      err,
      500,
      chalk.bold.red("Error de GET/:ID FILE CONTROLLER")
    );
  }
}

async function createFile(req, res) {
  try {
    const { title } = req.body;
    console.log(title);
    console.log(req.file);
    const newFile = new fileModel({
      title: title,
      file: req.file.path,
    });
    const create = await newFile.save();
    response.success(req, res, create, 201);
  } catch (err) {
    response.error(
      req,
      res,
      err,
      500,
      chalk.bold.red("Error de POST FILE CONTROLLER")
    );
  }
}

async function updateFile(req, res) {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const eliminar = await fileModel.findById(id);
    if (eliminar) {
      await fs.unlink(path.resolve(eliminar.file));
    }
    const updateFile = await fileModel.findOneAndUpdate(
      id,
      {
        file: req.file.path,
        title: title,
      },
      { new: true }
    );
    response.success(req, res, updateFile, 200);
  } catch (err) {
    response.error(
      req,
      res,
      err,
      500,
      chalk.bold.red("Error de UPDATE FILE CONTROLLER")
    );
  }
}

async function deleteFile(req, res) {
  try {
    const { id } = req.params;
    const File = await fileModel.findByIdAndRemove(id);
    if (File) {
      await fs.unlink(path.resolve(File.file));
    }
    response.success(req, res, "eliminado", 204);
  } catch (err) {
    response.error(
      req,
      res,
      err,
      500,
      chalk.bold.red("Error de DELETE FILE CONTROLLER")
    );
  }
}

module.exports = {
  list: getFiles,
  get: getFile,
  create: createFile,
  update: updateFile,
  eliminar: deleteFile,
};
