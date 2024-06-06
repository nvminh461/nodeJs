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
    return db.createTable('courses', {
        id: {type: 'int', primaryKey: true, autoIncrement: true},
        name: 'string',
        description: 'string',
        image: 'string',
        slug: 'string',
        video_id: 'string',
        created_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
        updated_at: {type: 'timestamp', defaultValue: String('CURRENT_TIMESTAMP')},
    });
};

exports.down = function (db) {
    return db.dropTable('courses');
};

exports._meta = {
    "version": 1
};
