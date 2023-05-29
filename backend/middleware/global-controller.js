const express = require("express");

const Message = require("../models/Message");
const dbSchema = require("../models/dbSchema");

// update db when server first start with the needed schema

const deployDbSchema = async () => {
  const dbSchemaController = new dbSchema();
  const isSuccessful = dbSchema.UpdateStatusForAll();
  return isSuccessful;
};

// whenever a user fetches the messages of a certain room update
// status for all records

const updateRoom = async (req, res, next) => {
  const MessagesController = new Message(next);

  await MessagesController.UpdateStatusForAll();

  next();
};

exports.deployDbSchema = deployDbSchema;
exports.updateRoom = updateRoom;
