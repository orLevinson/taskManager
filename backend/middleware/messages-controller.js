const express = require("express");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Message = require("../models/Message");

const getAllMessagesInRoom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const room_id = req.params.rid;

  const MessagesController = new Message(next);

  const messages = await MessagesController.getAllByRoom(room_id);

  if (messages) {
    const messagesArray = [[], [], []];

    messages.forEach((message) => {
      messagesArray[message.status].push(message);
    });

    res.json({
      success: true,
      messages: messagesArray,
    });
  }
};

const addMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { task_name, user_id, project_id, other_members, dead_line, comment } =
    req.body;
  const MessagesController = new Message(next);

  const addedMessage = await MessagesController.addMessage(
    task_name,
    user_id,
    project_id,
    other_members,
    dead_line,
    comment
  );

  if (addedMessage) {
    res.json({
      success: true,
      added_message: addedMessage,
    });
  }
};
const changeMessageValuesById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const messageId = req.params.mid;
  const { task_name, user_id, project_id, other_members, dead_line, comment } =
    req.body;
  const MessagesController = new Message(next);

  const changedMessage = await MessagesController.changeValuesById(
    messageId,
    task_name,
    user_id,
    project_id,
    other_members,
    dead_line,
    comment
  );

  if (
    changedMessage &&
    Array.isArray(changedMessage) &&
    changedMessage.length === 1
  ) {
    res.json({
      success: true,
      changed_message: changedMessage[0],
    });
  } else {
    const error = new HttpError("No message was changed", 422);
    return next(error);
  }
};
const changeMessageStatusById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const messageId = req.params.mid;
  const { status } = req.body;
  const MessagesController = new Message(next);

  const changedMessage = await MessagesController.changeStatusById(
    messageId,
    status
  );

  if (
    changedMessage &&
    Array.isArray(changedMessage) &&
    changedMessage.length === 1
  ) {
    res.json({
      success: true,
      changed_message: changedMessage[0],
    });
  } else {
    const error = new HttpError("No message was changed", 422);
    return next(error);
  }
};
const deleteMessageById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const messageId = req.params.mid;

  const MessagesController = new Message(next);

  const deletedMessage = await MessagesController.deleteById(messageId);

  if (
    deletedMessage &&
    Array.isArray(deletedMessage) &&
    deletedMessage.length === 1
  ) {
    res.json({
      success: true,
      message: "message was deleted successfully!",
    });
  } else {
    const error = new HttpError("No message was changed", 422);
    return next(error);
  }
};

exports.getAllMessagesInRoom = getAllMessagesInRoom;
exports.addMessage = addMessage;
exports.changeMessageValuesById = changeMessageValuesById;
exports.changeMessageStatusById = changeMessageStatusById;
exports.deleteMessageById = deleteMessageById;
