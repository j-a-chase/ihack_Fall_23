const config = require("../settings.json"),
      userSettings = require("./user-settings.js");
const embedMSG = {
    guilds: {
        helpEmbed: {
            color: parseInt(config.color),
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
        }
    },
    direct: {
        helpEmbed: {
            color: parseInt(config.color),
            title: 'Canvas LMS - BYUI - DM',
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
        },
    },
    settings: {
        mainEmbed: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Settings ',
            description: 'A list of current settings. `null` represents no settings defined.',
            thumbnail: {
                url: config.logoURL,
            },
            fields: [
                { 
                    name: '**API Key**', 
                    value: '*This content is not displayed for security purposes.*',
                    inline: false,
                },
                {
                    name: '**Embed Color**',
                    value: `\`${userSettings.color}\``,
                    inline: true,
                },
                {
                    name: '**Show Assignment Links**',
                    value: `\`${userSettings.links}\``,
                    inline: true,
                }, 
                {
                    name: '**Show Grades**',
                    value: `\`${userSettings.grades}\``,
                    inline: true,
                },
                {
                    name: '**Display Recent Grades**',
                    value: `from \`${userSettings.recentGrades}\` days ago *(default)*`
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        changeSetting: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Settings Error',
            description: 'No setting was defined. Available values are:\n\n`key` > Set the API Key\n`color` > Set the Message Embed Color\n`links` > Show/Hide Assignment Links\n`grades` > Show/Hide Grades',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        changeKey: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Error Changing API Key',
            description: 'Not enough arguments. Make sure to include your API Key.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        setKey: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Changed API Key',
            description: 'Successfully changed API Key! Please allow a few minutes for this change to take effect.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        changeColor: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Error Changing Embed Color',
            description: 'Not enough arguments. Make sure to include your color as a HEX code.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        setColor: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Changed Embed Color',
            description: 'Successfully changed Embed Color! Please allow a minute for this change to take effect.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        changeLinks: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Error Changing Link Display Settings',
            description: 'Not enough arguments. Make sure to include `show` or `hide`.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        setShowLinks: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Showing Assignment Links',
            description: 'Successfully changed the display of assignment links to `show`! Please allow a few minutes for this change to take effect.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        setHideLinks: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Hiding Assignment Links',
            description: 'Successfully changed the display of assignment links to `hide`! Please allow a few minutes for this change to take effect.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        invalidLinkSetting: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Error Changing Display of Assignment Links',
            description: 'Please indicate if you\'d like to `hide` or `show` links to your assignments in messages.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        changeGrades: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Error Changing Grade Display Settings',
            description: 'Not enough arguments. Make sure to include `show` or `hide`.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        setShowGrades: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Showing Assignment Grades',
            description: 'Successfully changed the display of assignment grades to `show`! Please allow a few minutes for this change to take effect.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        setHideGrades: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Hiding Assignment Grades',
            description: 'Successfully changed the display of assignment grades to `hide`! Please allow a few minutes for this change to take effect.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        invalidGradeSetting: {
            color: parseInt(config.color),
            title: 'Canvas LMS | Error Changing Display of Assignment Grades',
            description: 'Please indicate if you\'d like to `hide` or `show` grades for your assignments in messages.',
            thumbnail: {
                url: config.logoURL,
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
    }
}
module.exports= { embedMSG };