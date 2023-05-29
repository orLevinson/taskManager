const express = require("express");
const { check, param } = require("express-validator");

const roomsController = require("../middleware/rooms-controller");

const router = express.Router();

// only admins able to preform the actions from this point forward
// router.use(checkAuth);


router.get("/", roomsController.getAllRooms);

// create new room
router.post(
  "/",
  [check("room_name").isString().escape(), check("room_name").not().isEmpty()],
  roomsController.addRoom
);

// change the name of existing room
router.patch(
  "/:rid",
  [
    check("new_name").isString().escape(),
    check("new_name").not().isEmpty(),
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
  ],
  roomsController.changeRoomById
);

// delete a room
router.delete(
  "/:rid",
  [param("rid").not().isEmpty(), param("rid").isString().escape()],
  roomsController.deleteRoomById
);

module.exports = router;
