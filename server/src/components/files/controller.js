const express = require("express");
const path = require("path");
const fs = require("fs-extra");
const fileModel = require("./model");
const response = require("../../network/response");
const { update } = require("./model");
// const { config } = require("../../../config");

async function getFiles(req, res) {
  try {
    const getFiles = await fileModel.find();
    response.success(req, res, getFiles, 200);
  } catch (err) {
    response.error(req, res, err, 500, "Error de GET FILE CONTROLLER");
  }
}

async function getFile(req, res) {
  const { id } = req.params;
  try {
    const getFile = await fileModel.findOne({ _id: id }[0]);
    response.success(req, res, getFile, 200);
  } catch (err) {
    response.error(req, res, err, 500, "Error de GET/:ID FILE CONTROLLER");
  }
}

async function createFile(req, res) {
  const { title } = req.body;
  // const file = req.file;
  try {
    // let fileURL = "";
    // if (file) {
    //   fileURL = `http://localhost:${config.api.port}/` + file.path;
    // }
    const newFile = fileModel({
      title: title,
      file: req.file.path,
    });
    const createFile = await newFile.save();
    response.success(req, res, createFile, 201);
  } catch (err) {
    response.error(req, res, err, 500, "Error de POST FILE CONTROLLER");
  }
}

async function updateFile(req, res) {
  const { id } = req.params;
  const { title } = req.body;
  try {
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
    response.error(req, res, err, 500, "Error de UPDATE FILE CONTROLLER");
  }
}

async function deleteFile(req, res) {
  const { id } = req.params;
  try {
    const File = await fileModel.findByIdAndRemove(id);
    if (File) {
      await fs.unlink(path.resolve(File.file));
    }
    response.success(req, res, "eliminado", 300);
  } catch (err) {
    response.error(req, res, err, 500, "Error de DELETE FILE CONTROLLER");
  }
}

module.exports = {
  list: getFiles,
  get: getFile,
  create: createFile,
  update: updateFile,
  eliminar: deleteFile,
};
