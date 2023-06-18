const db = require("../db");
const HttpError = require("./http-error");

class dbSchema {
  async UpdateStatusForAll() {
    try {
      await db.query(`BEGIN`);
      await db.query(`
      CREATE TABLE IF NOT EXISTS Rooms (
        room_id SERIAL PRIMARY KEY,
        room_name VARCHAR NOT NULL
      );`);

      await db.query(`CREATE TABLE IF NOT EXISTS Projects (
        project_id SERIAL PRIMARY KEY,
        project_name VARCHAR NOT NULL,
        room_id INTEGER REFERENCES Rooms(room_id)
      );`);

      await db.query(`
      CREATE TABLE IF NOT EXISTS Users (
        user_id SERIAL PRIMARY KEY,
        room_id INTEGER REFERENCES Rooms(room_id),
        is_admin BOOLEAN,
        full_name VARCHAR NOT NULL,
        hashed_password VARCHAR NOT NULL,
        user_name VARCHAR NOT NULL
      );`);

      await db.query(`
      CREATE TABLE IF NOT EXISTS Messages (
        message_id SERIAL PRIMARY KEY,
        task_name VARCHAR NOT NULL,
        user_id INTEGER REFERENCES Users(user_id),
        project_id INTEGER REFERENCES Projects(project_id),
        sub_project VARCHAR NOT NULL DEFAULT '',
        status INTEGER CHECK (status IN (0, 1, 2)),
        other_members VARCHAR[],
        dead_line DATE,
        finished_date DATE,
        comment VARCHAR
      );
      `);

      const { rows: existingRooms } = await db.query(`SELECT * FROM rooms`);

      if (existingRooms.length === 0) {
        console.log("no room exists - creating one now");
        await db.query(
          `INSERT INTO rooms(room_name) VALUES (${
            process.env.DEFAULT_ROOM_NAME
              ? process.env.DEFAULT_ROOM_NAME
              : "new_room"
          })`
        );
      }

      await db.query(`COMMIT`);
    } catch (error) {
      await db.query(`ROLLBACK`);
      return { success: false };
    }
    return { success: true };
  }
}

module.exports = dbSchema;
