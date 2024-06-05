const sql = require('../config/db');
const slug = require('slug');

// constructor
const Product = function (Product) {
    this.product_name = Product.product_name;
    this.description = Product.description;
    this.price = Product.price;
    this.image = Product.image;
    this.sku = slug(Product.product_name, {lower: true});
    this.category_id = Product.category_id;
    this.created_at = new Date();
    this.updated_at = new Date();
};

Product.create = async (newProduct, result) => {
    newProduct.sku = await generateUniqueSku(newProduct.sku);
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...newProduct});
    });
}

Product.updateById = (id, Product, result) => {
    sql.query(
        "UPDATE products SET product_name = ?, description = ?, price = ?, image = ?, category_id = ? WHERE id = ?",
        [Product.product_name, Product.description, Product.price, Product.image, Product.category_id, id],
        (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                result({kind: "not_found"}, null);
                return;
            }

            result(null, {id: id, ...Product});
        }
    );
}

async function generateUniqueSku(sku) {
    let uniqueSku = sku;
    let counter = 1;

    while (await skuExists(uniqueSku)) {
        uniqueSku = `${sku}-${counter}`;
        counter++;
    }

    return uniqueSku;
}

function skuExists(sku) {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT *
                   FROM products
                   WHERE sku = '${sku}'`, (err, res) => {
            if (err) {
                reject(err);
            }

            resolve(res.length > 0);
        });
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

Product.findById = (productId, result) => {
    sql.query(`SELECT *
               FROM products
               WHERE id = ${productId}`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
}

Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        result(null, res);
    });
}

Product.removeByIds = (ids, result) => {
    sql.query(`DELETE
               FROM products
               WHERE id IN (${ids})`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        result(null, res);
    });
}

Product.getBySlug = (slug, result) => {
    sql.query(`SELECT *
               FROM products
               WHERE sku = '${slug}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
}
module.exports = Product;
