const config = require("../settings.json"),
      {userSettings} = require("./user-settings.js");
const embedMSG = {
    guilds: {
        helpEmbed: {
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
            title: 'Canvas LMS | Settings ',
            description: 'A list of current settings. " *(default)* " represents no user defined settings.',
            thumbnail: {
                url: config.logoURL,
            },
            fields: [
                { 
                    name: '**API Key**', 
                    value: `${userSettings.apiKey}`,
                    inline: false,
                },
                {
                    name: '**Embed Color**',
                    value: `${userSettings.color.toString(16)}`,
                    inline: true,
                },
                {
                    name: '**Show Assignment Links**',
                    value: `${userSettings.links}`,
                    inline: true,
                }, 
                {
                    name: '**Show Grades**',
                    value: `${userSettings.grades}`,
                    inline: true,
                },
                {
                    name: '**Display Recent Grades**',
                    value: `from the last ${userSettings.recentGrades}`
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'A BYU-Idaho Hackathon Project',
                iconURL: config.logoURL,
            },
        },
        changeSetting: {
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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
            color: userSettings.embedColor,
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