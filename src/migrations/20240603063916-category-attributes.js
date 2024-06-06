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
    return db.createTable('category_attributes', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        category_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'category_attributes_category_id_fk',
                table: 'categories',
                mapping: 'id',
                rules: {
                    onDelete: 'CASCADE',
                },
            },
        },
        attribute_name: {type: 'string', length: 100, notNull: true},
        attribute_detail: {type: 'json', notNull: true},
        created_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
        updated_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
    })
};

exports.down = function (db) {
    return db.dropTable('category_attributes');
};

exports._meta = {
    "version": 1
};
