const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
const Project = require("../models/Project");
const User = require("../models/User");

// this will give the user data based on the token withing the authorization header
const getAuth = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    //on app.js we allow the attach so the Authorization header
    const token = req.headers.authorization.split(" ")[1]; // Authorization : 'Bearer TOKEN' //split give an array of 2 values [Bearer,TOKEN]
    //scenario 2 -> we succeed but what ever we have in there doesnt give us any token

    if (!token) {
      throw new Error("Authentication failed!");
    }
    //process.env.JWT_KEY is taken from nodemon.json
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const UsersController = new User(next);

    let userData;

    userData = await UsersController.getById(
      decodedToken ? decodedToken.id : ""
    );

    if (!userData || !Array.isArray(userData) || userData.length !== 1) {
      throw new Error("Authentication failed!");
    }

    req.userData = {
      isAdmin: userData[0].is_admin,
      roomId: userData[0].room_id,
      userId: userData[0].user_id,
    }; //add data to the request object (the id is set on the login() and signUp())

    next(); // means that we succeed to get the token we are allow to continue with the  proccess
  } catch (err) {
    //scenario 1 -> authorization headers has not set at all and therefore split failes
    const error = new HttpError("Authentication failed", 403);
    next(error);
  }
};

const checkIfAdmin = async (req, res, next) => {
  if (req.userData.isAdmin) {
    next();
  } else {
    const error = new HttpError("Authentication failed", 403);
    next(error);
  }
};

const checkIfBelongsToRoom = async (req, res, next) => {
  const room_id = req.params.rid;
  const user_room_id = req.userData.roomId;
  const is_admin = req.userData.isAdmin;

  if ("" + user_room_id === "" + room_id || is_admin) {
    return next();
  } else {
    const error = new HttpError(
      "Authentication failed, does not belong to room",
      403
    );
    next(error);
  }
};

const checkIfProjectInRoom = async (req, res, next) => {
  const user_room_id = req.userData.roomId;
  let project_id = req.body.project_id ? req.body.project_id : req.params.pid;

  const ProjectsController = new Project(next);

  const isInRoom = await ProjectsController.checkIfInRoomId(
    project_id,
    user_room_id
  );

  if (isInRoom) {
    return next();
  } else {
    const error = new HttpError(
      "Authentication failed, project isn't allowed",
      403
    );
    next(error);
  }
};

exports.getAuth = getAuth;
exports.checkIfAdmin = checkIfAdmin;
exports.checkIfBelongsToRoom = checkIfBelongsToRoom;
exports.checkIfProjectInRoom = checkIfProjectInRoom;
