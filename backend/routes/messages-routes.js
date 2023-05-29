const express = require("express");
const { check, param } = require("express-validator");

const messagesController = require("../middleware/messages-controller");

const router = express.Router();

// only regular users are able to preform the actions from this point forward
// router.use(checkAuth);

// get all messages of a room
router.get(
  "/:rid",
  [param("rid").not().isEmpty(), param("rid").isString().escape()],
  messagesController.getAllMessagesInRoom
);

// add new message
router.post(
  "/",
  [
    check("task_name").isString().escape(),
    check("task_name").not().isEmpty(),
    check("user_id").isString().escape(),
    check("user_id").not().isEmpty(),
    check("project_id").isString().escape(),
    check("project_id").not().isEmpty(),
    check("other_members.*").isString().escape(),
    check("dead_line").optional().isDate(),
    check("comment").optional().isString().escape(),
  ],
  messagesController.addMessage
);

// change values of existing message by id
router.patch(
  "/values/:mid",
  [
    param("mid").not().isEmpty(),
    param("mid").isString().escape(),
    check("task_name").isString().escape(),
    check("task_name").not().isEmpty(),
    check("user_id").isString().escape(),
    check("user_id").not().isEmpty(),
    check("project_id").isString().escape(),
    check("project_id").not().isEmpty(),
    check("other_members.*").isString().escape(),
    check("dead_line").optional().isDate(),
    check("comment").optional().isString().escape(),
  ],
  messagesController.changeMessageValuesById
);

// change status of existing message by id
router.patch(
  "/status/:mid",
  [
    check("status").escape(),
    check("status").not().isEmpty(),
    param("mid").not().isEmpty(),
    param("mid").isString().escape(),
  ],
  messagesController.changeMessageStatusById
);

// delete a message by id
router.delete(
  "/:mid",
  [param("mid").not().isEmpty(), param("mid").isString().escape()],
  messagesController.deleteMessageById
);

module.exports = router;
