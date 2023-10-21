const { Client, Collection, EmbedBuilder, GatewayIntentBits, Partials } = require('discord.js');
const config = require("./settings.json");
const chokidar = require('chokidar');
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
                        // Add checks to make sure the API key is valid & save the keyvalue pair in the database.
                        message.channel.send({embeds: [embedMSG.settings.setKey]});
                    } else if (args[1] == "set" && args[2] == "color" && args[3]) {
                        // Add checks to make sure the API key is valid & save the keyvalue pair in the database.
                        message.channel.send({embeds: [embedMSG.settings.setColor]});
                    } else if (args[1] == "set" && args[2] == "links" && args[3]) {
                        if (args[3] == "show") {
                            message.channel.send({embeds: [embedMSG.settings.setShowLinks]});
                        } else if (args[3] == "hide") {
                            message.channel.send({embeds: [embedMSG.settings.setHideLinks]});
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
                        message.channel.send({embeds: [embedMSG.settings.mainEmbed]});
                    }
                break;
                case 'db':
                    async function something() {
                        try {
                            const data = await grabData.grabData(); // This will await the result of grabData
                            // Use the data here
                            console.log(data);
                        } catch (error) {
                            // Handle any errors that occur during the grabData operation
                            console.error(error);
                        }
                    }

                    // Call the async function
                    something();
                break;
            }
        } else return;
    } 
});

client.login(config.token);