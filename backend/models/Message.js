const db = require("../db");
const HttpError = require("./http-error");

class Message {
  constructor(errFunction) {
    this.errFunction = errFunction;
  }

  async getAllByRoom(room_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        `SELECT *
         FROM messages 
         WHERE project_id 
         IN (SELECT project_id 
        FROM projects WHERE room_id=$1)`,
        [room_id]
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't fetch messages", 500));
    }
    return result;
  }

  async addMessage(
    task_name,
    user_id,
    project_id,
    other_members,
    dead_line,
    comment
  ) {
    let result = [];
    try {
      const { rows } = await db.query(
        `INSERT INTO messages(task_name, user_id, project_id, other_members, dead_line, comment,status)
        VALUES ($1,$2,$3,$4,$5,$6,1) 
        RETURNING *`,
        [task_name, user_id, project_id, other_members, dead_line, comment]
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't add messages", 500));
    }
    return result;
  }

  async changeValuesById(
    message_id,
    task_name,
    user_id,
    project_id,
    other_members,
    dead_line,
    comment
  ) {
    let result = [];
    try {
      const { rows } = await db.query(
        `UPDATE messages SET task_name=$1, user_id=$2, project_id=$3, other_members=$4, dead_line=$5, comment=$6 
         WHERE message_id=$7
         RETURNING *`,
        [
          task_name,
          user_id,
          project_id,
          other_members,
          dead_line,
          comment,
          message_id,
        ]
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't change message", 500));
    }
    return result;
  }

  async changeStatusById(message_id, status) {
    let result = [];
    try {
      const { rows } = await db.query(
        `UPDATE messages SET status=$1 
        WHERE message_id=$2 
        RETURNING *`,
        [status, message_id]
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't change message", 500));
    }
    return result;
  }

  async deleteById(message_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        `DELETE FROM messages
        WHERE message_id = $1 RETURNING *;`,
        [message_id]
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't delete message", 500));
    }
    return result;
  }

  async UpdateStatusForAll() {
    let result = [];
    try {
      const { rows } = await db.query(
        `
        UPDATE messages SET status = 0 
        WHERE dead_line <= CURRENT_DATE AND status=1;
    `
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't update statuses", 500));
    }
    return result;
  }
}

module.exports = Message;
