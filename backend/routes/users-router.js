const express = require("express");
const { check, param } = require("express-validator");

const usersController = require("../middleware/users-controller");
const authController = require("../middleware/auth-controller");

const router = express.Router();

// accessible by everyone

// register a new user
router.post(
  "/register",
  [
    check("username").isString().escape(),
    check("username").not().isEmpty(),
    check("password").isString().escape(),
    check("password").not().isEmpty(),
    check("password").isLength({ min: 6 }),
    check("fullname").not().isEmpty(),
  ],
  usersController.register
);

router.post(
  "/login",
  [
    check("username").isString().escape(),
    check("username").not().isEmpty(),
    check("password").isString().escape(),
    check("password").not().isEmpty(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.login
);

// only admins and regular users are able to preform the actions from this point forward
router.use(authController.getAuth);

// only regular users
// check token validity
router.get("/check", usersController.checkToken);

// only admins
router.use(authController.checkIfAdmin);

// get all users info
router.get("/", usersController.getAllUsers);

// change the room of the user
router.patch(
  "/room/:uid",
  [
    check("room_id").isString().escape(),
    check("room_id").not().isEmpty(),
    param("uid").not().isEmpty(),
    param("uid").isString().escape(),
  ],
  usersController.changeUserRoomById
);

// change the privilleges of a user
router.patch(
  "/privileges/:uid",
  [
    check("is_admin").isBoolean(),
    param("uid").not().isEmpty(),
    param("uid").isString().escape(),
  ],
  usersController.changeUserPrivilegeById
);

// delete a user
router.delete(
  "/:uid",
  [param("uid").not().isEmpty(), param("uid").isString().escape()],
  usersController.deleteUserById
);

module.exports = router;
