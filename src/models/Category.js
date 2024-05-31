const sql = require('../config/db');

// constructor
const Category = function (Category) {
    this.category_name = Category.category_name;
    this.description = Category.description;
};

Category.create = (newCategory, result) => {
    sql.query("INSERT INTO categories SET ?", newCategory, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Category: ", {id: res.insertId, ...newCategory});
        result(null, {id: res.insertId, ...newCategory});
    });
}

Category.getAll = (name, result, sort) => {
    let query = "SELECT * FROM categories";
    if (name) {
        query += ` WHERE category_name LIKE '%${name}%'`;
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

        console.log("categories: ", res);
        result(null, res);
    });
};

Category.findById = (categoryId, result) => {
    sql.query(`SELECT *
               FROM categories
               WHERE id = ${categoryId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Category: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Category with the id
        result({kind: "not_found"}, null);
    });
}

Category.updateById = (id, Category, result) => {
    sql.query(
        "UPDATE categories SET category_name = ?, description = ? WHERE id = ?",
        [Category.category_name, Category.description, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Category with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated Category: ", {id: id, ...Category});
            result(null, {id: id, ...Category});
        }
    );
}

Category.remove = (id, result) => {
    sql.query("DELETE FROM categories WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Category with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted Category with id: ", id);
        result(null, res);
    });
}

Category.removeByIds = (ids, result) => {
    sql.query(`DELETE
               FROM categories
               WHERE id IN (${ids.join(",")})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} categories`);
        result(null, res);
    });
}


module.exports = Category;
