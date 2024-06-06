'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
    dbm = options.dbmigrate;
    type = dbm.dataType;
    seed = seedLink;
};


exports.up = function (db) {
    return db.createTable('products', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        product_name: {type: 'string', length: 100, notNull: true},
        description: {type: 'text'},
        price: {type: 'decimal', notNull: true, precision: 10, scale: 2},
        image: {type: 'string', length: 255},
        sku: {type: 'string', length: 100},
        category_id: {
            type: 'int',
            foreignKey: {
                name: 'products_category_id_fk',
                table: 'categories',
                mapping: 'id',
                rules: {
                    onDelete: 'SET NULL'
                }
            }
        },
        created_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
        updated_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
    });
};

exports.down = function (db) {
    return db.dropTable('products');
};

exports._meta = {
    "version": 1
};
