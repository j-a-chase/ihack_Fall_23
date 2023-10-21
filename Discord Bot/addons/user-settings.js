const { pool } = require('./data/db.js');
//Default Values
let color = "`0xE80231`",
    links = "`YES`",
    grades = "`YES`",
    recentGrades = 14,
    defaultStr = " *(default)*",
    apiKey = '*This content is not displayed for security purposes.*'

let defaults = {
    color: "`0xE80231`",
    links: "`YES`",
    grades: "`YES`",
    recentGrades: 14,
}

let isDefault = {
    color: "",
    links: "",
    grades: "",
    recentGrades: "",
}

setValues()

async function setValues() {
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


updateDefaults();
async function updateDefaults() {
    if (defaults.color == color) isDefault.color = defaultStr;
    if (defaults.links == links) isDefault.links = defaultStr;
    if (defaults.grades == grades) isDefault.grades = defaultStr;
    if (defaults.recentGrades == recentGrades) isDefault.recentGrades = " "+defaultStr;
}

const userSettings = {
    embedColor: parseInt(color.split("`")[1]),
    color: color + isDefault.color,
    links: links + isDefault.links,
    grades: grades + isDefault.grades,
    recentGrades: "`"+recentGrades+"`" + " days" + isDefault.recentGrades,
    apiKey: apiKey,
}
module.exports = { userSettings };