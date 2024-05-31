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
    return db.createTable('categories', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        category_name: {type: 'string', length: 100, notNull: true, unique: true},
        description: {type: 'text'},
        created_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
        updated_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
    });
};

exports.down = function (db) {
    return db.dropTable('categories');
};

exports._meta = {
    "version": 1
};
