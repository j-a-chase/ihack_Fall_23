const { pool } = require('./db');

module.exports = {
    insertData: async function insData(url, code) {
        try {
            const res = await pool.query(
                "INSERT INTO strpairs (url, code) VALUES ($1, $2)",
                [url, code]
            );
            console.log(`Added a url (${url}) with the code: ${code}`);
        } catch (e) {
            console.error(e);
        }
    }
}