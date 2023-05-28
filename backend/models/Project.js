const db = require("../db");
const HttpError = require("./http-error");

class Project {
  constructor(errFunction) {
    this.errFunction = errFunction;
  }

  async getByRoomId(room_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        "SELECT * FROM projects WHERE room_id=$1",
        [room_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't fetch projects", 500));
    }
    return result;
  }

  async addByRoomId(project_name, room_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        "INSERT INTO prjects(project_name,room_id) VALUES ($1,$2) RETURNING project_id,project_name,room_id",
        [project_name, room_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't add project", 500));
    }
    return result;
  }

  async changeById(project_id, new_name) {
    let result = [];
    try {
      const { rows } = await db.query(
        "UPDATE projects SET project_name=$1 WHERE project_id=$2 RETURNING project_id,project_name",
        [new_name, project_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't change project", 500));
    }
    return result;
  }

  async deleteById(project_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        `
      DELETE FROM Messages
      WHERE project_id = $1
    
      DELETE FROM Projects
      WHERE project_id = $1;
    `,
        [project_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't delete project", 500));
    }
    return result;
  }
}

module.exports = Project;
