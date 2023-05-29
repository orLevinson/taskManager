const express = require("express");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const Room = require("../models/Room");

const getAllRooms = async (req, res, next) => {
  const RoomController = new Room(next);

  const rooms = await RoomController.getAll();

  if (rooms) {
    res.json({
      success: true,
      rooms,
    });
  }
};

const addRoom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { room_name } = req.body;

  const RoomController = new Room(next);

  const addedRoom = await RoomController.addRoom(room_name);

  if (addedRoom) {
    res.json({
      success: true,
      new_room: addedRoom,
    });
  }
};

const changeRoomById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const room_id = req.params.rid;
  const { new_name } = req.body;

  const RoomController = new Room(next);

  const changedRoom = await RoomController.changeById(room_id, new_name);

  if (changedRoom) {
    res.json({
      success: true,
      changed_room: changedRoom,
    });
  }
};

const deleteRoomById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const room_id = req.params.rid;

  const RoomController = new Room(next);

  const changedRoom = await RoomController.deleteById(room_id);

  if (changedRoom) {
    res.json({
      success: true,
      message: "room has been deleted!",
    });
  }
};

exports.getAllRooms = getAllRooms;
exports.addRoom = addRoom;
exports.changeRoomById = changeRoomById;
exports.deleteRoomById = deleteRoomById;
