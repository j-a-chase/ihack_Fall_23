import { Client, EmbedBuilder, GatewayIntentBits, Partials } from 'discord.js';
import config from "./settings.json" assert { type: "json"};

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

//Embeds:
const helpEmbed = {
    color: 0xE80231,
    title: 'Canvas LMS - BYUI',
    description: 'See a list of commands and valid arguments.',
    thumbnail: {
        url: config.logoURL,
    },
    fields: [
        { 
            name: '`help`', 
            value: 'Displays this menu.'
        }
    ],
    timestamp: new Date().toISOString(),
    footer: {
        text: 'A BYU-Idaho Hackathon Project',
        iconURL: config.logoURL,
    },
};
    

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.author.bot == true) return;
    if (message.guildId != null) {
        if (message.content.startsWith(config.prefix)) {
            const prefix = message.content.slice(1);
            const command = prefix.split(' ')[0];

            switch (command) {
            case 'ping':
                message.channel.send('pong');
                break;
            case 'help':
                message.channel.send({embeds: [helpEmbed]});
                break;
            }
        }
    } else if (message.guildId == null) {
        message.channel.send('Yay!')
    } else return;
});

client.login(config.token);