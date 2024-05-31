const sql = require('../config/db');

// constructor
const Product = function (Product) {
    this.product_name = Product.product_name;
    this.description = Product.description;
    this.price = Product.price;
    this.image = Product.image;
    this.category_id = Product.category_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newProduct});
    });
}

Product.getAll = (name, result, sort) => {
    let query = "SELECT * FROM products";
    if (name) {
        query += ` WHERE product_name LIKE '%${name}%'`;
    }
    if (sort) {
        query += ` ORDER BY ${sort.sort} ${sort.order}`;
    }
    sql.query(query, (err, res) => {
        if (err) {
            result(null, err);
            return;
        }

        result(null, res);
    });
}
module.exports = Product;
