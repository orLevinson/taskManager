const db = require("../db");
const HttpError = require("./http-error");

class Room {
  constructor(errFunction) {
    this.errFunction = errFunction;
  }

  async getAll() {
    let result = [];
    try {
      const { rows } = await db.query("SELECT * FROM rooms");
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't fetch rooms", 500));
    }
    return result;
  }

  async addRoom(room_name) {
    let result = [];
    try {
      const { rows } = await db.query(
        "INSERT INTO rooms(room_name) VALUES ($1) RETURNING room_id,room_name",
        [room_name]
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't add room", 500));
    }
    return result;
  }

  async changeById(room_id, new_name) {
    let result = [];
    try {
      const { rows } = await db.query(
        "UPDATE rooms SET room_name=$1 WHERE room_id=$2 RETURNING room_id,room_name",
        [new_name, room_id]
      );
      result = rows;
    } catch (error) {
      return this.errFunction(new HttpError("couldn't change room", 500));
    }
    return result;
  }

  async deleteById(room_id) {
    let result = [];
    try {
      await db.query(`BEGIN`);
      await db.query(
        `
      DELETE FROM messages
      WHERE project_id IN (
        SELECT project_id
        FROM projects
        WHERE room_id = $1
      ) RETURNING message_id;`,
        [room_id]
      );
      await db.query(
        `
        DELETE FROM users
        WHERE room_id = $1;`,
        [room_id]
      );
      await db.query(
        `
        DELETE FROM projects
        WHERE room_id = $1;`,
        [room_id]
      );
      const { rows } = await db.query(
        `
        DELETE FROM rooms
        WHERE room_id = $1;`,
        [room_id]
      );
      await db.query(`COMMIT`);
      result = rows;
    } catch (error) {
      await db.query(`ROLLBACK`)
      return this.errFunction(new HttpError("couldn't delete room", 500));
    }
    return result;
  }
}

module.exports = Room;
