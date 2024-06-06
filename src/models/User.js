const sql = require('../config/db');
const slug = require("slug");


// constructor
const User = function (User) {
    this.username = User.username;
    this.password_hash = User.password_hash;
    this.email = User.email;
    this.created_at = new Date();
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created User: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
}

User.findByEmail = (email, result) => {
    sql.query(`SELECT *
               FROM users
               WHERE email = ?`, email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found User: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({kind: "not_found"}, null);
    });
}

module.exports = User;
