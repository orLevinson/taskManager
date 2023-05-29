const express = require("express");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Project = require("../models/Project");

const getProjectsByRoomId = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const room_id = req.params.rid;

  const ProjectController = new Project(next);

  const projects = await ProjectController.getByRoomId(room_id);

  if (projects) {
    res.json({
      success: true,
      projects,
    });
  }
};

const addProjectByRoomId = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const room_id = req.params.rid;
  const { project_name } = req.body;

  const ProjectController = new Project(next);

  const addedProject = await ProjectController.addByRoomId(
    project_name,
    room_id
  );

  if (addedProject) {
    res.json({
      success: true,
      new_project: addedProject,
    });
  }
};

const changeProjectById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const project_id = req.params.pid;
  const { new_name } = req.body;

  const ProjectController = new Project(next);

  const changedProject = await ProjectController.changeById(
    project_id,
    new_name
  );

  if (changedProject) {
    res.json({
      success: true,
      changed_project: changedProject,
    });
  }
};

const deleteProjectById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const project_id = req.params.pid;

  const ProjectController = new Project(next);

  const deletedProject = await ProjectController.deleteById(project_id);

  if (deletedProject) {
    res.json({
      success: true,
      message: "project was deleted successfully!",
    });
  }
};

exports.getProjectsByRoomId = getProjectsByRoomId;
exports.addProjectByRoomId = addProjectByRoomId;
exports.changeProjectById = changeProjectById;
exports.deleteProjectById = deleteProjectById;
