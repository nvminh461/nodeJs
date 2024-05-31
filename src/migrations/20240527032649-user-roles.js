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
    return db.createTable('user_roles', {
        user_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'user_roles_user_id_fk',
                table: 'users',
                mapping: 'user_id',
                rules: {
                    onDelete: 'CASCADE'
                }
            }
        },
        role_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'user_roles_role_id_fk',
                table: 'roles',
                mapping: 'role_id',
                rules: {
                    onDelete: 'CASCADE'
                }
            }
        }
    });
};

exports.down = function (db) {
    return db.dropTable('user_roles');
};

exports._meta = {
    "version": 1
};
