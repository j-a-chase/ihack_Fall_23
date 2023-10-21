import { Client, EmbedBuilder, GatewayIntentBits } from 'discord.js';
import config from "./settings.json" assert { type: "json"};

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ] 
});

//Embeds:
const helpEmbed = new EmbedBuilder()
    .setColor(0xE80231)
    .setTitle('Canvas LMS - BYUI')
    .setDescription('See a list of commands and valid arguments.')
    .addFields(
        { name: '`help`', value: 'Displays this menu.'}
    )
    .setTimestamp()
    .setFooter

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (message.content.startsWith(config.prefix)) {
    const prefix = message.content.slice(1);
    const command = prefix.split(' ')[0];

    switch (command) {
      case 'ping':
        message.channel.send('pong');
        break;
      case 'help':
        message.channel.send({embeds: helpEmbed});
        break;
    }
  }
});

client.login(config.token);