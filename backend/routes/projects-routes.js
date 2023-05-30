const express = require("express");
const { check, param } = require("express-validator");

const projectsController = require("../middleware/projects-controller");
const authController = require("../middleware/auth-controller");

const router = express.Router();

// only room members able to preform this
router.use(authController.getAuth);

// accessible by people of the room
// get all projects in a certain room
router.get(
  "/:rid",
  [param("rid").not().isEmpty(), param("rid").isString().escape()],
  authController.checkIfBelongsToRoom,
  projectsController.getProjectsByRoomId
);

// add a new project to a room
router.post(
  "/:rid",
  [
    check("project_name").isString().escape(),
    check("project_name").not().isEmpty(),
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
  ],
  authController.checkIfBelongsToRoom,
  projectsController.addProjectByRoomId
);

// change project's name
router.patch(
  "/:rid/:pid",
  [
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
    check("new_name").isString().escape(),
    check("new_name").not().isEmpty(),
    param("pid").not().isEmpty(),
    param("pid").isString().escape(),
  ],
  authController.checkIfBelongsToRoom,
  authController.checkIfProjectInRoom,
  projectsController.changeProjectById
);

// delete a project
router.delete(
  "/:rid/:pid",
  [
    param("rid").not().isEmpty(),
    param("rid").isString().escape(),
    param("pid").not().isEmpty(),
    param("pid").isString().escape(),
  ],
  authController.checkIfBelongsToRoom,
  authController.checkIfProjectInRoom,
  projectsController.deleteProjectById
);

module.exports = router;
