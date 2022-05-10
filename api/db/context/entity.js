const db = require('./db');

class Entity {

    /** @type {string} Table name from the database */
    table
    /** @type {string} The name from id field */
    _id

    /**
     * @param {string} table The name of the table to connect
     * @param {string} id The name of the id field (if not used defaults to 'table_name' + '_' + 'id')
     */
    constructor(table, id) {
        this.table = table;
        this._id = id || `${table}_id`;
    }

    /**
     * Selects all the available records
     */
    async all() {
        const rows = await db.any(`SELECT * FROM ${this.table}`);
        return rows;
    }

    /**
     * Selects an specific item by id
     * @param {string | number} id
     */
    async select(id) {
        const rows = await db.any(`SELECT * FROM ${this.table} WHERE ${this._id} = ${id};`);
        return rows.length > 0 ? rows[0] : null;
    }
    /**
     * Delete an specific item by id
     * @param {string | number} id
     */
    async delete(id) {
        const rows = await db.any(`DELETE FROM ${this.table} WHERE ${this._id} = ${id};`);
        return rows.length > 0 ? rows[0] : null;
    }
    /**
     * Insert an specific item (only for task)
     * @param {string} name
     * @param {string} description
     * @param {Date} due_date
     */
    async insert(name, description, due_date){
        const rows = await db.any(`INSERT INTO ${this.table} (name, description, due_date) VALUES(${name}, ${description}, ${due_date});`);
        return rows.length > 0 ? rows[0] : null;
    }
    /**
     * Retrive the size of table task
     */
     async size() {
        const rows = await db.any(`SELECT COUNT(*) FROM ${this.table};`);
        return rows.length > 0 ? rows[0] : null;
    }

}

module.exports = Entity;