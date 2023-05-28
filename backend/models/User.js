const db = require("../db");
const HttpError = require("./http-error");

class User {
  constructor(errFunction) {
    this.errFunction = errFunction;
  }

  async getAll() {
    let result = [];
    try {
      const { rows } = await db.query(
        `SELECT user_id,room_id,room_name,is_admin,full_name 
         FROM users 
         LEFT JOIN rooms ON users.room_id = rooms.room_id`
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't fetch users", 500));
    }
    return result;
  }

  async getById(user_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        `SELECT user_id,room_id,room_name,is_admin,full_name 
         FROM users 
         WHERE user_id=$1 
         LEFT JOIN rooms ON users.room_id = rooms.room_id`,
        [user_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't fetch user", 500));
    }
    return result;
  }

  async addUser(user_name, hashed_password, full_name) {
    let result = [];
    try {
      const { rows } = await db.query(
        `INSERT INTO users(user_name,hashed_password,full_name,is_admin)
        VALUES ($1,$2,$3,FALSE) 
        RETURNING user_id,is_admin,full_name`,
        [user_name, hashed_password, full_name]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't add room", 500));
    }
    return result;
  }

  async changeRoom(room_id, user_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        `UPDATE users SET room_id=$1 
        WHERE user_id=$2 
        RETURNING user_id,is_admin,full_name`,
        [room_id, user_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't change room", 500));
    }
    return result;
  }

  async changePrivileges(is_admin, user_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        `UPDATE users SET is_admin=$1 
        WHERE user_id=$2 
        RETURNING user_id,is_admin,full_name`,
        [is_admin ? "TRUE" : "FALSE", user_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't change room", 500));
    }
    return result;
  }

  async deleteById(user_id) {
    let result = [];
    try {
      const { rows } = await db.query(
        `
        UPDATE messages SET user_id = NULL 
        WHERE user_id=$1;
    
        DELETE FROM Users
        WHERE user_id = $1;
    `,
        [user_id]
      );
      result = rows;
    } catch (error) {
      this.errFunction(HttpError("couldn't delete room", 500));
    }
    return result;
  }
}

module.exports = User;
