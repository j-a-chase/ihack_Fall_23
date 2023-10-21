const { pool } = require('./db');

module.exports = {
    grabData: async function retrieveData(code) {
        const query = {
            name: 'fetch-url',
            text: 'SELECT url FROM strpairs WHERE code = $1',
            values: [code],
        }
        const query1 = {
            name: 'fetch-url',
            text: 'SELECT * FROM bot_settings'
        }
        try {
            const res = await pool.query(query1);
            return res.rows[0];
        } catch (e) {
            console.error(e);
        }
    }
}