const { Client } = require('pg'),
      userSettings = require('../user-settings'),
      msg = require('../messages'),
      util = require('util'),
      dotenv = require('dotenv');

dotenv.config({path:'../../.env'});

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PSWD,
  port: 5432,
});

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL database');
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  }
}
async function checkTableExists(tableName) {
  try {
    const query = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${tableName}')`;
    const result = await client.query(query);
    return result.rows[0].exists;
  } catch (err) {
    console.error('Error checking table existence:', err);
    return false;
  }
}

connectToDatabase();

module.exports = {
    loadSettings: async function init(userID) {
      try {
        const query = 'SELECT * FROM bot_settings WHERE discord_id = $1';
        const result = await client.query(query, [userID]);

        console.log('SEARCHED DATABASE FOR CURRENT USER.');

        if (!result.rows[0]) {
          console.log('Creating new user in the database.');
          const insertQuery =
            'INSERT INTO bot_settings (discord_id, color, showlinks, showgrades, pastgrades, apikey) VALUES ($1, $2, $3, $4, $5, $6)';
          await client.query(insertQuery, [
            userID,
            userSettings.defaults.color.split('`')[1],
            userSettings.defaults.links.split('`')[1],
            userSettings.defaults.grades.split('`')[1],
            userSettings.defaults.recentGrades,
            'NONE',
          ]);
          const newUser = await client.query(
            'SELECT color, showlinks, showgrades, pastgrades, apikey FROM bot_settings WHERE discord_id = $1',
            [userID]
          );
          return newUser.rows;
        }

        return result.rows;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    setColor: async function init(userID, color) {
      try {
        const query = 'UPDATE bot_settings SET color = $1 WHERE discord_id = $2';
        await client.query(query, [color, userID]);

        console.log('Set color of user: ' + userID);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    setHistory: async function init(userID, n) {
      try {
        const query = 'UPDATE bot_settings SET pastgrades = $1 WHERE discord_id = $2';
        await client.query(query, [n, userID]);

        console.log('Set grade history of user: ' + userID);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    addKey: async function addKey(userID, key) {
      const query = 'UPDATE bot_settings SET apikey = $1 WHERE discord_id = $2';
      client.query(query, [key, userID], function (e, r, f) {
        if (e) console.error(e);
        console.log('Added API key for user: ' + userID);
      });
    },
    linkVisibility: async function updateLink(userID, v) {
      const query = 'UPDATE bot_settings SET showlinks = $1 WHERE discord_id = $2';
      client.query(query, [v, userID], function (e, r, f) {
        if (e) console.error(e);
        console.log('Updated Link Visibility for user: ' + userID);
      });
    },
    gradeVisibility: async function updateGrade(userID, v) {
      const query = 'UPDATE bot_settings SET showgrades = $1 WHERE discord_id = $2';
      client.query(query, [v, userID], function (e, r, f) {
        if (e) console.error(e);
        console.log('Updated Grade Visibility for user: ' + userID);
      });
    },
    loadGrades: async function courseGrades(userID) {
      try {
        const query = 'SELECT course_name, course_letter_grade, course_score FROM api WHERE discord_id = $1';
        const result = await client.query(query, [userID]);

        console.log('SEARCHED API DATABASE FOR CURRENT USER.');

        if (!result.rows[0]) return;

        return result.rows;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    loadUpcoming: async function upcomingAssignments(userID) {
      try {
        const query = 'SELECT course_name, course_code, upcoming_assignments FROM api WHERE discord_id = $1';
        const result = await client.query(query, [userID]);

        console.log('SEARCHED API DATABASE FOR CURRENT USER.');

        if (!result.rows[0]) return;

        return result.rows;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    showLink: async function loadParam(userID) {
      try {
        const query = 'SELECT showlinks FROM bot_settings WHERE discord_id = $1';
        const result = await client.query(query, [userID]);

        console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
        if (!result.rows[0]) return;

        return result.rows;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    showGrades: async function loadParam(userID) {
      try {
        const query = 'SELECT showgrades FROM bot_settings WHERE discord_id = $1';
        const result = await client.query(query, [userID]);

        console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
        if (!result.rows[0]) return;

        return result.rows;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    showGradeHistory: async function loadParam(userID) {
      try {
        const query = 'SELECT showgrades, pastgrades, showlinks FROM bot_settings WHERE discord_id = $1';
        const result = await client.query(query, [userID]);

        console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
        if (!result.rows[0]) return;

        return result.rows;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    pastAssignments: async function loadParam(userID) {
      try {
        const query = 'SELECT course_name, course_code, past_assignments FROM api WHERE discord_id = $1';
        const result = await client.query(query, [userID]);

        console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
        if (!result.rows[0]) return;

        return result.rows;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    dndToggle: async function loadParam(userID, status) {
      try {
        const query = 'UPDATE bot_settings SET dnd = $1 WHERE discord_id = $2';
        await client.query(query, [status, userID]);

        console.log('Set DND status of user: ' + userID);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    checkTableExists,
    createTable: async function loadParam(table_name) {
      try {
        const query = `CREATE TABLE ${table_name} (discord_id VARCHAR(255), apikey VARCHAR(255), color VARCHAR(255), showlinks VARCHAR(255), showgrades VARCHAR(255), pastgrades VARCHAR(255), dnd VARCHAR(255))`;
        await client.query(query);

        console.log('CREATED TABLE: ' + table_name);
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
};