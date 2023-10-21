
//Default Values
let color = parseInt('0xE80231'),
    links = "YES",
    grades = "YES",
    recentGrades = 14,
    defaultStr = " *(default)*"

let defaults = {
    color: parseInt('0xE80231'),
    links: "YES",
    grades: "YES",
    recentGrades: 14,
}

let isDefault = {
    color: "",
    links: "",
    grades: "",
    recentGrades: "",
}

//DATABSE CALLS

async function updateDefaults() {
    if (defaults.color == color) isDefault.color = defaultStr;
    if (defaults.links == links) defaults.links = defaultStr;
    if (defaults.grades == grades) isDefault.grades = defaultStr;
    if (defaults.recentGrades == recentGrades) defaults.recentGrades = defaultStr;
}

const userSettings = {
    embedColor: color,
    color: color + isDefault.color,
    links: links + isDefault.links,
    grades: grades + isDefault.grades,
    recentGrades: recentGrades + isDefault.recentGrades,
}
module.exports = {userSettings};