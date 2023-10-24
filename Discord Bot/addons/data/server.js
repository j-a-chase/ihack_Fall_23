const mysql = require('mysql'),
      userSettings = require('../user-settings'),
      msg = require('../messages'),
      util = require('util');
const dotenv = require('dotenv');
dotenv.config({path:'../../.env'});

console.log(dotenv.config({path:'../.env'}))
const pool = mysql.createPool({
    connectionLimit: 20,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PSWD,
    database: process.env.DB
});

const query = util.promisify(pool.query).bind(pool);


module.exports = {
    loadSettings: async function init(userID) {
        try {
            const result = await query('SELECT * FROM bot_settings WHERE discord_id = ?', [userID]);
            
            console.log('SEARCHED DATABASE FOR CURRENT USER.');

            if (!result[0]) {
                console.log(`Creating new user in the database.`);
                await query(
                    `INSERT INTO bot_settings (discord_id, color, showlinks, showgrades, pastgrades, apikey) VALUES (?, ?, ?, ?, ?, 'NONE')`,
                    [userID, userSettings.defaults.color.split('`')[1], userSettings.defaults.links.split('`')[1], userSettings.defaults.grades.split('`')[1], userSettings.defaults.recentGrades]
                );
                const newUser = await query('SELECT color, showlinks, showgrades, pastgrades, apikey FROM bot_settings WHERE discord_id = ?', [userID]);
                return newUser;
            }
            
            return result;

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    setColor: async function init(userID, color) {
        try {
            const result = await query(`UPDATE bot_settings SET color = '${color}' WHERE discord_id = ?`, [userID]);
            
            console.log('Set color of user: '+userID);

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    setHistory: async function init(userID, n) {
        try {
            const result = await query(`UPDATE bot_settings SET pastgrades = '${n}' WHERE discord_id = ?`, [userID]);
            
            console.log('Set grade history of user: '+userID);

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    addKey: async function addKey(userID,key) {
        pool.query(`UPDATE bot_settings SET apikey = '${key}' WHERE discord_id = ${userID}`, function (e,r,f) {
            if (e) console.error(e);
            console.log('Added API key for user: ' + userID)
        })
    },
    linkVisibility: async function updateLink(userID, v) {
        pool.query(`UPDATE bot_settings SET showlinks = '${v}' WHERE discord_id = ${userID}`, function (e,r,f) {
            if (e) console.error(e);
            console.log('Updated Link Visibility for user: ' + userID);
        })
    },
    gradeVisibility: async function updateGrade(userID, v) {
        pool.query(`UPDATE bot_settings SET showgrades = '${v}' WHERE discord_id = ${userID}`, function (e,r,f) {
            if (e) console.error(e);
            console.log('Updated Grade Visibility for user: ' + userID);
        })
    },
    loadGrades: async function courseGrades(userID) {
        try {
            const result = await query('SELECT course_name, course_letter_grade, course_score FROM api WHERE discord_id = ?', [userID]);
            
            console.log('SEARCHED API DATABASE FOR CURRENT USER.');

            if (!result[0]) return;

            return result;

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    loadUpcoming: async function upcomingAssignments(userID) {
        try {
            const result = await query('SELECT course_name, course_code, upcoming_assignments FROM api WHERE discord_id = ?', [userID]);
            
            console.log('SEARCHED API DATABASE FOR CURRENT USER.');

            if (!result[0]) return;

            return result;

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    showLink: async function loadParam(userID) {
        try {
            const result = await query('SELECT showlinks FROM bot_settings WHERE discord_id = ?', [userID]);
            
            console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
            if (!result[0]) return;
            
            return result;

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    showGrades: async function loadParam(userID) {
        try {
            const result = await query('SELECT showgrades FROM bot_settings WHERE discord_id = ?', [userID]);
            
            console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
            if (!result[0]) return;
            
            return result;

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    showGradeHistory: async function loadParam(userID) {
        try {
            const result = await query('SELECT showgrades, pastgrades, showlinks FROM bot_settings WHERE discord_id = ?', [userID]);
            
            console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
            if (!result[0]) return;
            
            return result;

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    pastAssignments: async function loadParam(userID) {
        try {
            const result = await query('SELECT course_name, course_code, past_assignments FROM api WHERE discord_id = ?', [userID]);
            
            console.log('SEARCHED BOT_SETTINGS DATABASE FOR CURRENT USER.');
            if (!result[0]) return;
            
            return result;

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
    dndToggle: async function loadParam(userID,status) {
        try {
            const result = await query(`UPDATE bot_settings SET dnd = '${status}' WHERE discord_id = ?`, [userID]);
            
            console.log('Set DND status of user: '+userID);

        } catch (error) {
            console.error(error);
            throw error; 
        }
    },
}