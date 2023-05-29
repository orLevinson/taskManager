const express = require("express");
const { check, param } = require("express-validator");

const projectsController = require("../middleware/projects-controller");

const router = express.Router();

// only room members able to preform this
// router.use(checkAuth);

// accessible by people of the room
// get all projects in a certain room
router.get(
  "/:rid",
  [param("rid").not().isEmpty(), param("rid").isString().escape()],
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
  projectsController.addProjectByRoomId
);

// change project's name
router.patch(
  "/:pid",
  [
    check("new_name").isString().escape(),
    check("new_name").not().isEmpty(),
    param("pid").not().isEmpty(),
    param("pid").isString().escape(),
  ],
  projectsController.changeProjectById
);

// delete a project
router.delete(
  "/:pid",
  [param("pid").not().isEmpty(), param("pid").isString().escape()],
  projectsController.deleteProjectById
);

module.exports = router;
