const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const User = require("../models/User");

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { username, password, fullname } = req.body;
  const UsersController = new User(next);

  //   check if user with the same username exists
  const simillarUsers = await UsersController.checkUserExists(username);
  if (simillarUsers.length > 0) {
    return next(new HttpError("This user already exists", 409));
  }

  //  hashing the password for DB
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Registeration failed, please try again later.",
      500
    );
    return next(error);
  }

  //   adding user to DB
  const added_user = await UsersController.addUser(
    username,
    hashedPassword,
    fullname
  );

  //   only if the user was added successfully create a token and
  //   send a successfull response
  if (added_user) {
    let token;
    try {
      token = jwt.sign(
        {
          id: added_user[0].user_id,
        },
        process.env.JWT_KEY, //process.env.JWT_KEY is taken from nodemon.json
        { expiresIn: "1w" }
      );
    } catch (err) {
      const error = new HttpError(
        "Registeration failed, please try again later.",
        500
      );
      return next(error);
    }

    res.json({
      success: true,
      userData: {
        token,
        room_id: added_user[0].room_id,
        room_name: added_user[0].room_name,
        is_admin: added_user[0].is_admin,
        name: added_user[0].full_name,
      },
    });
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { username, password } = req.body;
  const UsersController = new User(next);

  //   check for users with the same username
  const matchingUsers = await UsersController.getUserByUsername(username);

  //   if there is a singular user
  if (
    matchingUsers &&
    Array.isArray(matchingUsers) &&
    matchingUsers.length === 1
  ) {
    // comparing the password to the hashed version saved in the DB
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(
        password,
        matchingUsers[0].hashed_password
      );
    } catch (err) {
      const error = new HttpError("logging in failed, please try again", 500);
      return next(error);
    }

    // throw an error if the passowrd didnt match the hashed one in db
    if (!isValidPassword) {
      const error = new HttpError(
        "wrong credentials entered, please try again",
        401
      );
      return next(error);
    }

    // get the rest of the info about the user if the password is correct
    const user = await UsersController.getById(matchingUsers[0].user_id);

    // create a token for the user
    let token;
    try {
      token = jwt.sign(
        {
          id: user[0].user_id,
        },
        process.env.JWT_KEY, //process.env.JWT_KEY is taken from nodemon.json
        { expiresIn: "1w" }
      );
    } catch (err) {
      const error = new HttpError(
        "logging in failed, please try again later.",
        500
      );
      return next(error);
    }

    // send a successfull response
    res.json({
      success: true,
      userData: {
        token,
        room_id: user[0].room_id,
        room_name: user[0].room_name,
        is_admin: user[0].is_admin,
        name: user[0].full_name,
      },
    });
  } else {
    const error = new HttpError(
      "wrong credentials entered, please try again",
      401
    );
    return next(error);
  }
};

const checkToken = async (req, res, next) => {
  const { userId } = req.userData;

  const UsersController = new User(next);

  const user = await UsersController.getById(userId);

  if (user && Array.isArray(user) && user.length === 1) {
    res.json({
      success,
      userData: {
        room_id: user[0].room_id,
        room_name: user[0].room_name,
        is_admin: user[0].is_admin,
        name: user[0].full_name,
      },
    });
  }
};

const getAllUsers = async (req, res, next) => {
  const UsersController = new User(next);

  const users = await UsersController.getAll();

  if (users) {
    res.json({
      success: true,
      users,
    });
  }
};

const changeUserRoomById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const user_id = req.params.uid;
  const { room_id } = req.body;

  const UsersController = new User(next);

  const changedUsers = await UsersController.changeUserRoom(room_id, user_id);

  if (changedUsers && changedUsers.length === 1) {
    res.json({
      success: true,
      changed_user: changedUsers[0],
    });
  } else {
    const error = new HttpError("No user was changed", 422);
    return next(error);
  }
};

const changeUserPrivilegeById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const user_id = req.params.uid;
  const { is_admin } = req.body;

  const UsersController = new User(next);

  const changedUsers = await UsersController.changePrivileges(
    is_admin,
    user_id
  );

  if (changedUsers && changedUsers.length === 1) {
    res.json({
      success: true,
      changed_user: changedUsers[0],
    });
  } else {
    const error = new HttpError("No user was changed", 422);
    return next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const user_id = req.params.uid;

  const UsersController = new User(next);

  const deletedUsers = await UsersController.deleteById(user_id);

  if (deletedUsers && deletedUsers.length === 1) {
    res.json({
      success: true,
      message: "User was deleted successfully!",
    });
  } else {
    const error = new HttpError("No user was changed", 422);
    return next(error);
  }
};

exports.register = register;
exports.login = login;
exports.checkToken = checkToken;
exports.getAllUsers = getAllUsers;
exports.changeUserRoomById = changeUserRoomById;
exports.changeUserPrivilegeById = changeUserPrivilegeById;
exports.deleteUserById = deleteUserById;
