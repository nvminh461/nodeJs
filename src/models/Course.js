const sql = require('../config/db');
const slug = require("slug");


// constructor
const Course = function (Course) {
    this.name = Course.name;
    this.description = Course.description;
    this.video_id = Course.videoId;
    this.slug = slug(Course.name);
    this.image = `https://img.youtube.com/vi/${Course.videoId}/sddefault.jpg`;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Course.create = (newCourse, result) => {
    sql.query("INSERT INTO courses SET ?", newCourse, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        const id = res.insertId;
        const createdCourse = {id: id, ...newCourse};

        // Check if slug already exists
        Course.getBySlug(createdCourse.slug, (err, res) => {
            if (res) {
                // If slug exists, append id to the slug
                createdCourse.slug += `-${id}`;

                // Update the course with the new slug
                Course.updateById(id, createdCourse, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    }
                });
            }
        });

        console.log("created Course: ", {id: res.insertId, ...newCourse});
        result(null, {id: res.insertId, ...newCourse});
    });
};

Course.findById = (id, result) => {
    sql.query(`SELECT *
               FROM courses
               WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found courses: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Course with the id
        result({kind: "not_found"}, null);
    });
};

Course.getBySlug = (slug, result) => {
    sql.query(`SELECT *
               FROM courses
               WHERE slug = "${slug}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

Course.getAll = (name, result, sort) => {
    let query = "SELECT * FROM courses";

    if (name) {
        query += ` WHERE name LIKE '%${name}%'`;
    }

    if (sort) {
        query += ` ORDER BY ${sort.sort} ${sort.order}`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Course.updateById = (id, Course, result) => {
    sql.query(
        "UPDATE courses SET name = ?, description = ?, video_id = ?, slug = ?, image = ?, updated_at = ? WHERE id = ?",
        [Course.name, Course.description, Course.video_id, Course.slug, Course.image, Course.updated_at, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Course with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated courses: ", {id: id, ...Course});
            result(null, {id: id, ...Course});
        }
    );
};

Course.remove = (id, result) => {
    sql.query("DELETE FROM courses WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Course with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted courses with id: ", id);
        result(null, res);
    });
};

Course.removeByIds = (ids, result) => {
    sql.query(`DELETE
               FROM courses
               WHERE id IN (${ids.join(",")})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} courses`);
        result(null, res);
    });
};

Course.removeAll = result => {
    sql.query("DELETE FROM courses", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} courses`);
        result(null, res);
    });
};

module.exports = Course;
