/**
 * SQLite Database Wrapper
 * Uses sql.js (WebAssembly) to run SQLite in the browser
 */

import { SAMPLE_DATA } from '../data/sampleDb.js';

export class SQLDatabase {
    constructor() {
        this.db = null;
        this.config = {
            locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
        };
    }

    async init() {
        try {
            const SQL = await initSqlJs(this.config);
            this.db = new SQL.Database();

            // Seed initial data
            this.db.run(SAMPLE_DATA);
            return true;
        } catch (error) {
            console.error('Database initialization failed:', error);
            throw error;
        }
    }

    executeQuery(sql) {
        if (!this.db) throw new Error('Database not initialised');

        try {
            // Split queries by semicolon and execute the last one that returns results
            // Note: this is a simple implementation. sql.js has .exec for multiple statements.
            const results = this.db.exec(sql);

            if (results.length === 0) {
                return { success: true, message: 'Query executed successfully. No rows returned.' };
            }

            return {
                success: true,
                columns: results[0].columns,
                values: results[0].values,
                rowCount: results[0].values.length
            };
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    getSchema() {
        if (!this.db) return [];

        // Query SQLite internal master table for schema
        const query = "SELECT name, sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'";
        const results = this.db.exec(query);

        if (results.length === 0) return [];

        const tables = results[0].values.map(row => {
            const tableName = row[0];
            const createSql = row[1];

            // Get columns for this table
            const colResults = this.db.exec(`PRAGMA table_info(${tableName})`);
            const columns = colResults[0].values.map(colRow => ({
                name: colRow[1],
                type: colRow[2]
            }));

            return { name: tableName, columns };
        });

        return tables;
    }

    reset() {
        if (!this.db) return;
        this.db.close();
        this.db = null;
        return this.init();
    }
}
