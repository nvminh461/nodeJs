const sql = require('../config/db');

// constructor
const Attribute = function (Attribute) {
    this.attribute_name = Attribute.attribute_name;
    this.attribute_detail = Attribute.attribute_detail;
    this.category_id = Attribute.category_id;
};

Attribute.create = (newAttribute, result) => {
    sql.query("INSERT INTO category_attributes SET ?", newAttribute, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created attribute: ", {id: res.insertId, ...newAttribute});
        result(null, {id: res.insertId, ...newAttribute});
    });
}

Attribute.getAll = (name, result, sort) => {
    let query = "SELECT * FROM category_attributes";
    if (name) {
        query += ` WHERE attribute_name LIKE '%${name}%'`;
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

        console.log("attributes: ", res);
        result(null, res);
    });
};

Attribute.findById = (attributeId, result) => {
    sql.query(`SELECT *
               FROM category_attributes
               WHERE id = ${attributeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found attribute: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Attribute with the id
        result({kind: "not_found"}, null);
    });
}

Attribute.updateById = (id, Attribute, result) => {
    sql.query(
        "UPDATE category_attributes SET attribute_name = ?, attribute_detail = ?, category_id = ?, updated_at = ? WHERE id = ?",
        [Attribute.attribute_name, Attribute.attribute_detail, Attribute.category_id, Attribute.updated_at, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Attribute with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated Attribute: ", {id: id, ...Attribute});
            result(null, {id: id, ...Attribute});
        }
    );
};

Attribute.remove = (id, result) => {
    sql.query("DELETE FROM category_attributes WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Attribute with the id
            result({kind: "not_found"}, null);
            return;
        }

        console.log("deleted Attribute with id: ", id);
        result(null, res);
    });
};

Attribute.removeByIds = (ids, result) => {
    sql.query(`DELETE
               FROM category_attributes
               WHERE id IN (${ids})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} attributes`);
        result(null, res);
    });
};

module.exports = Attribute;
