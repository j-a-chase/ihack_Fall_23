const { Client, Collection, EmbedBuilder, GatewayIntentBits, Partials } = require('discord.js');
const config = require("./settings.json");
const chokidar = require('chokidar');
const db = require('./addons/data/server.js');
let embedMSG;

// Create a file watcher for messages.js
const watcher = chokidar.watch('./addons/messages.js');

// Function to re-require the module
const reRequireModule = () => {
  try {
    delete require.cache[require.resolve('./addons/messages.js')];
    const addon = require('./addons/messages.js');
    embedMSG = addon.embedMSG;
    console.log('Importing messages.');
  } catch (error) {
    console.error('Error re-requiring messages.js:', error);
  }
};

// Initialize by requiring the module
reRequireModule();

// Listen for 'change' events when the file is modified
watcher.on('change', (path) => {
  reRequireModule();
});

// Your script can now use the embedMSG variable
setTimeout(() => {
  if (embedMSG) {
    console.log("Successfully loaded messages file.");
  } else {
    console.log('Unable to retrieve messages.');
  }
}, 1000);

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content.startsWith(config.prefix)) {
        let args = message.content.slice(1);
        args = args.split(' ');
        const command = args[0];
        if (message.author.bot == true) return;
        if (message.guildId != null) {
            switch (command) {
                case 'help':
                    message.channel.send({embeds: [embedMSG.guilds.helpEmbed]});
                break;
            }
        } else if (message.guildId == null) {
            switch (command) {
                case 'help':
                    message.channel.send({embeds: [embedMSG.direct.helpEmbed]});
                break;
                case 'settings':
                    if (args[1] == "set" && args[2] == "key" && args[3]) {
                        db.addKey(message.author.id,args[3]).then(r => {
                            message.channel.send({embeds: [embedMSG.settings.setKey]});
                        })
                    } else if (args[1] == "set" && args[2] == "color" && args[3]) {
                        // Add checks to make sure the API key is valid & save the keyvalue pair in the database.
                        message.channel.send({embeds: [embedMSG.settings.setColor]});
                    } else if (args[1] == "set" && args[2] == "links" && args[3]) {
                        if (args[3] == "show") {
                            db.linkVisibility(message.author.id, "YES").then(r => {
                                message.channel.send({embeds: [embedMSG.settings.setShowLinks]});
                            })
                        } else if (args[3] == "hide") {
                            db.linkVisibility(message.author.id, "NO").then(r => {
                                message.channel.send({embeds: [embedMSG.settings.setHideLinks]});
                            })
                        } else {
                            message.channel.send({embeds: [embedMSG.settings.invalidLinkSetting]});
                        }
                    } else if (args[1] == "set" && args[2] == "grades" && args[3]) {
                        if (args[3] == "show") {
                            message.channel.send({embeds: [embedMSG.settings.setShowGrades]});
                        } else if (args[3] == "hide") {
                            message.channel.send({embeds: [embedMSG.settings.setHideGrades]});
                        } else {
                            message.channel.send({embeds: [embedMSG.settings.invalidGradeSetting]});
                        }
                    } else if (args[1] == "set" && args[2] == "key") {
                        message.channel.send({embeds: [embedMSG.settings.changeKey]});
                    } else if (args[1] == "set" && args[2] == "color") {
                        message.channel.send({embeds: [embedMSG.settings.changeColor]});
                    } else if (args[1] == "set" && args[2] == "links") {
                        message.channel.send({embeds: [embedMSG.settings.changeLinks]});
                    } else if (args[1] == "set" && args[2] == "grades") {
                        message.channel.send({embeds: [embedMSG.settings.changeGrades]});
                    } else if (args[1] == "set" && !args[2]) {
                        message.channel.send({embeds: [embedMSG.settings.changeSetting]});
                    } else {
                        db.loadSettings(message.author.id).then(r => {
                            let embed = embedMSG.settings.mainEmbed;
                            console.log(r);
                            if (!r.apikey) embed.fields[0].value = `Please provide an API Key.`;
                            if (r.showlinks != "YES") embed.fields[2].value = `\`${r.showlinks}\``
                            if (r.showgrades != "YES") embed.fields[3].value = `\`${r.showgrades}\``
                            if (r.pastgrades != 14) embed.fields[4].value = `from the last \`${r.pastgrades}\` days.`
                            message.channel.send({embeds: [embed]});
                        })
                        
                    }
                break;
                case 'recentgrades':
                    message.channel.send({embeds: [embedMSG.school.recentGrades]})
                break;
                case 'upcoming':
                    db.loadUpcoming('251913040885317634').then(r => {
                        let embed = embedMSG.school.upcoming,
                            fieldArr = [];
                        for (let x=0; x<r.length; x++) {
                            let v = r[x].upcoming_assignments.split("_");
                            let name = v[0],
                                date = v[1],
                                link = v[2],
                                str = `\n**${name}** \n*__DUE: ${date}__* \n${link}`;
                            if (r[x].upcoming_assignments == '') r[x].upcoming_assignments = "No new assignments for the next 7 days.";
                            if (!name) str = 'No upcoming assignments :smile:'
                            fieldArr.push({
                                name: `**${r[x].course_name} | ${r[x].course_code}**`,
                                value: str
                            })
                        }
                        embed.fields = fieldArr;
                        message.channel.send({embeds: [embed]});
                    })
                break;
                case 'grades':
                    db.loadGrades('251913040885317634').then(r => {
                        let embed = embedMSG.school.grades,
                            fieldArr = [];
                        for (let x=0; x<r.length; x++) {
                            if (r[x].course_letter_grade == null) r[x].course_letter_grade = "N/A";
                            if (r[x].course_score == null) r[x].course_score = "N/A";
                            fieldArr.push({
                                name: `**${r[x].course_name}: ${r[x].course_letter_grade}**`,
                                value: `Computed Score: ${r[x].course_score}`,
                                inline: true
                            })
                        }
                        embed.fields = fieldArr;
                        message.channel.send({embeds: [embed]});
                    })
                break;
            }
        } else return;
    } 
});

client.login(config.token);