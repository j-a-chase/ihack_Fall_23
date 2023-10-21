const { pool } = require('./db');

module.exports = {
    insertData: async function insData(id, color, showLinks, showGrades, pastGrades) {
        try {
            const res = await pool.query(
                "INSERT INTO bot_settings (discord_id, color, showlinks, showgrades, pastgrades) VALUES ($1, $2, $3, $4, $5)",
                [id, color, showLinks, showGrades, pastGrades]
            );
            console.log(`Added a user with ID: ${id}`);
        } catch (e) {
            console.error(e);
        }
    }
}