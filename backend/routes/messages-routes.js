const express = require("express");
const { check, param } = require("express-validator");

const messagesController = require("../middleware/messages-controller");
const authController = require("../middleware/auth-controller");
const globalController = require("../middleware/global-controller");

const router = express.Router();

// only regular users are able to preform the actions from this point forward
router.use(authController.getAuth);

// get all messages of a room
router.get(
  "/:rid",
  [param("rid").not().isEmpty(), param("rid").isString().escape()],
  authController.checkIfBelongsToRoom,
  globalController.updateRoom,
  messagesController.getAllMessagesInRoom
);

// add new message
router.post(
  "/:rid",
  [
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
    check("task_name").isString().escape(),
    check("task_name").not().isEmpty(),
    check("user_id").isString().escape(),
    check("user_id").not().isEmpty(),
    check("project_id").isString().escape(),
    check("project_id").not().isEmpty(),
    check("sub_project").isString().escape(),
    check("sub_project").not().isEmpty(),
    check("other_members.*").isString().escape(),
    check("dead_line")
      .optional()
      .custom((value) => {
        if (isNaN(new Date(value))) {
          throw new Error("Invalid date format");
        }
        return true;
      }),
    check("comment").optional().isString().escape(),
    check("giver").optional().isString().escape(),
  ],
  authController.checkIfBelongsToRoom,
  authController.checkIfProjectInRoom,
  messagesController.addMessage
);

// change values of existing message by id
router.patch(
  "/:rid/values/:mid",
  [
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
    param("mid").not().isEmpty(),
    param("mid").isString().escape(),
    check("task_name").isString().escape(),
    check("task_name").not().isEmpty(),
    check("user_id").isString().escape(),
    check("user_id").not().isEmpty(),
    check("project_id").isString().escape(),
    check("project_id").not().isEmpty(),
    check("sub_project").isString().escape(),
    check("sub_project").not().isEmpty(),
    check("other_members.*").isString().escape(),
    check("dead_line")
      .optional()
      .custom((value) => {
        if (isNaN(new Date(value))) {
          throw new Error("Invalid date format");
        }
        return true;
      }),
    check("finished_date")
      .optional()
      .custom((value) => {
        if (isNaN(new Date(value))) {
          throw new Error("Invalid date format");
        }
        return true;
      }),
    check("comment").optional().isString().escape(),
    check("comment").optional().isString().escape(),
  ],
  authController.checkIfBelongsToRoom,
  authController.checkIfProjectInRoom,
  messagesController.changeMessageValuesById
);

// change status of existing message by id
router.patch(
  "/:rid/status/:mid",
  [
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
    check("status").escape(),
    check("status").not().isEmpty(),
    param("mid").not().isEmpty(),
    param("mid").isString().escape(),
  ],
  authController.checkIfBelongsToRoom,
  messagesController.changeMessageStatusById
);

// delete a message by id
router.delete(
  "/:rid/:mid",
  [
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
    param("mid").not().isEmpty(),
    param("mid").isString().escape(),
  ],
  authController.checkIfBelongsToRoom,
  messagesController.deleteMessageById
);

module.exports = router;
