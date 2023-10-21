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


async function fetchSettings(c,l,g,r) {
    color = `\`${c}\``;
    grades = `\`${g}\``;
    links = `\`${l}\``;
    recentGrades = `\`${r}\``;
    finalizeSettings();
    let val= {
        color: color,
        grades: grades,
        links: links,
        recentGrades: recentGrades
    }
    return val;
}



async function updateDefaults() {
    if (defaults.color == color) isDefault.color = defaultStr;
    if (defaults.links == links) isDefault.links = defaultStr;
    if (defaults.grades == grades) isDefault.grades = defaultStr;
    if (defaults.recentGrades == recentGrades) isDefault.recentGrades = " "+defaultStr;
}
async function finalizeSettings() {
    updateDefaults();
}
let userSettings = {
    embedColor: parseInt(color.split("`")[1]),
    color: color + isDefault.color,
    links: links + isDefault.links,
    grades: grades + isDefault.grades,
    recentGrades: "`"+recentGrades+"`" + " days" + isDefault.recentGrades,
    apiKey: apiKey,
}

module.exports = { userSettings, defaults, fetchSettings, finalizeSettings};