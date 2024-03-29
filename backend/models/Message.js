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
        `SELECT messages.*,users.full_name,projects.project_name
         FROM messages 
        LEFT JOIN users 
        ON users.user_id=messages.user_id
        LEFT JOIN projects 
        ON projects.project_id=messages.project_id
        WHERE messages.project_id 
         IN (SELECT project_id 
        FROM projects WHERE room_id=$1)
        `,
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
    sub_project,
    giver,
    other_members,
    dead_line,
    comment
  ) {
    let result = [];
    try {
      const { rows } = await db.query(
        `WITH added_message AS (
          INSERT INTO messages (task_name, user_id, project_id,sub_project, giver, other_members, dead_line, comment, status,finished_date)
          VALUES ($1, $2, $3, $4, $5, $6, $7,$8, 1,NULL)
          RETURNING *
        )
        SELECT added_message.*, users.full_name, projects.project_name
        FROM added_message
        LEFT JOIN users ON users.user_id = added_message.user_id
        LEFT JOIN projects ON projects.project_id = added_message.project_id;
        
        `,
        [
          task_name,
          user_id,
          project_id,
          sub_project,
          giver,
          other_members,
          dead_line,
          comment,
        ]
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
    sub_project,
    giver,
    other_members,
    dead_line,
    finished_date,
    comment
  ) {
    let result = [];
    try {
      const { rows } = await db.query(
        ` 
         WITH updated_message AS (
          UPDATE messages SET task_name=$1, user_id=$2, project_id=$3, sub_project=$4, giver=$5, other_members=$6, dead_line=$7, comment=$8,
          finished_date = CASE WHEN status = 2 THEN $9 ELSE finished_date END
         WHERE message_id=$10
         RETURNING *
        )
        SELECT updated_message.*, users.full_name, projects.project_name
        FROM updated_message
        LEFT JOIN users ON users.user_id = updated_message.user_id
        LEFT JOIN projects ON projects.project_id = updated_message.project_id;`,
        [
          task_name,
          user_id,
          project_id,
          sub_project,
          giver,
          other_members,
          dead_line,
          comment,
          finished_date,
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

    console.log(status);
    try {
      const { rows } = await db.query(
        `UPDATE messages 
        SET status = $1,
            finished_date = CASE WHEN $1 = 2 THEN CURRENT_DATE ELSE NULL END
        WHERE message_id = $2
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
