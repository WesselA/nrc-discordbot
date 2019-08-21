const config = require('./config.json');
const Discord = require('discord.js');
const util = require('util');
const fetch = require("node-fetch");
const bot = new Discord.Client({
    disableEveryone: true,
    disabledEvents: ['TYPING_START']
});

bot.on("ready", () => {
// setInterval(fetchFunction,1000)
//     function fetchFunction(){
//     fetch('http://151.80.54.182:30588/players.json')
//         .then(response => response.json())
//         .then(data => {
//             var obj = data;
//             var spelers = obj.length;
//             var spelers_aantal = `Er zijn momenteel ${spelers} spelers online!`;
//             bot.user.setGame(`${spelers} spelers op NRC`); //you can set a default game
//         })
//         .catch(error => {
//             console.log(error);
//         });
//     }
    bot.user.setGame('Soon...'); //you can set a default game
    console.log(`Bot is online!\n${bot.users.size} spelers, in ${bot.guilds.size} servers connected.`);
});

bot.on("message", async message => {

    if(message.author.bot || message.system) return;

    console.log(message.content);
    
    if (message.content.indexOf(config.prefix) === 0) {
        
        let msg = message.content.slice(config.prefix.length);

        let args = msg.split(" ");

        let cmd = args[0].toLowerCase();

        args.shift();

        if (cmd === 'spelers') {
            message.delete(1000);
            fetch('http://151.80.54.182:30588/players.json')
                .then(response => response.json())
                .then(data => {
                    var obj = data;
                    var spelers = obj.length;
                    var spelers_aantal = `Er zijn momenteel ${spelers} spelers online!`;
                    return message.channel.send(spelers_aantal);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        // message.channel.send
        // message.author.send/
        if (cmd === 'over') {
            message.delete(1000);
            message.channel.send({embed: {
                    color: 10354690,
                    title: "NRC Discord Bot",
                    description: "Deze bot staat gelinked aan de website (http://nrc-rp.nl) en kan commands uitvoeren voor informatie.",
                    fields: [{
                        name: "Website",
                        value: "Deze bot is gelinked aan de website, er zullen steeds meer features komen met deze bot en de website! 😄"
                    },
                        {
                            name: "Bot",
                            value: "Deze bot kan commands uitvoeren en meer! Als je ideeën hebt stuur Wessel een PM of plaats een suggestie in het #suggesties kanaal!"
                        },
                        {
                            name: "Door",
                            value: "Gemaakt door <@262213629796024320>, met dank aan <@147363094186688512> 🙃"
                        }
                    ],
                }
            });
        }
        else if (cmd === 'nrc') {
            message.delete(1000);
            message.channel.send({embed: {
                    color: 10354690,
                    description: "Dit zijn een paar commands die je kunt uitvoeren:",
                    fields: [
                        {
                            name: "!spelers",
                            value: 'Hiermee kun je het spelers aantal opvragen. (dit is ook te vinden bij de game status van de bot)'
                        },
                        {
                            name: "!over",
                            value: 'Informatie over de discord bot.'
                        },
                        {
                            name: "!ip",
                            value: 'De main server IP'
                        },
                        {
                            name: "!website",
                            value: 'Een link naar de website.'
                        },
                        {
                            name: "!discord",
                            value: 'Geeft de discord invite link.'
                        }
                    ],
                }
            });
        }

        if(cmd === `auto`){
            let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
            if (!dUser) return message.channel.send("Tag een speler uit deze discord!");
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Helaas, geen perms!");
            let dMessage = args.join(" ").slice(22);
            if(dMessage.length < 1) return message.reply('Vul je telefoon nummer in!');

            dUser.send({embed: {
                    color: 10354690,
                    description: "Uw order voor de exclusieve auto dealer is aangekomen!",
                    fields: [
                        {
                            name: "Informatie",
                            value: `Omdat de bestelling gedaan is via de website krijg je korting op deze auto. Hieronder vindt je het telefoon nummer van de auto handelaar, stuur hem een berichtje als hij in de stad is!`
                        },
                        {
                            name: "Contact",
                            value: `Het telefoon nummer van ${message.author} is ${dMessage}. Stuur hem een berichtje om de auto te kopen!`
                        },
                        {
                            name: "Geholpen door",
                            value: `De bestelling is verwerkt door ${message.author}!`
                        }
                    ],
                }
            });///
            message.author.send(`${message.author} Succes! Het bericht is verzonden naar ${dUser}, hij stuurt je een bericht in de stad.`)
        }
        // else if (cmd === 'politie') {
        //     // message.delete(2500);
        //     message.channel.send('test').then(function(message) {
        //         message.react('❔');
        //         message.react('🔒');
        //
        //         const filter = (reaction, user) => {
        //             return ['❔', '🔒'].includes(reaction.emoji.name) && user.id === message.author.id;
        //         };
        //
        //         message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        //             .then(collected => {
        //                 const reaction = collected.first();
        //
        //                 if (reaction.emoji.name === '❔') {
        //                     message.reply('you reacted with a thumbs up.');
        //                 } else {
        //                     message.reply('you reacted with a thumbs down.');
        //                 }
        //             })
        //             .catch(collected => {
        //                 console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
        //                 message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
        //             });
        // })}
        else if (cmd === 'website') {
            message.delete(1000);
            return message.channel.send('De website van NRC: http://nrc-rp.nl');
        }
        else if (cmd === 'discord') {
            message.delete(1000);
            return message.channel.send('De discord van NRC: https://discordapp.com/invite/MMpPav3');
        }
        else if (cmd === 'ip') {
            message.delete(1000);
            return message.channel.send('Main server IP (OneSync): 151.80.54.182:30588');
        }
        else if (cmd === 'spam') {
            message.delete(1);
            return message.author.send('hey');
        }
        else if (cmd === 'vissen') {
            message.delete(1000);
            return message.channel.send('Lekker gaan vissen met je vrienden? en ook nog eens geld verdienen?\n' +
                'het kan nu!\n' +
                'Ren zo snel mogelijk naar de winkel koop je hengel en voer en gaan!\n' +
                '\n' +
                'Bootje huren Geen probleem hebben we mensen voor in dienst die je 24/7 bootje verhuren voor een leuk prijsje\n' +
                '\n' +
                'Toch een bootje kopen? Ga je gang dat is ook mogelijk en natuurlijk een stuk goedkoper als je vaak gaat vissen met je vrienden!');
        }

    } else if (message.content.indexOf("<@"+bot.user.id) === 0 || message.content.indexOf("<@!"+bot.user.id) === 0) {
            message.delete(5000);
            return message.channel.send(`Gebruik "!" Of check !nrc voor alle commands.`);
        }
});

function evalCmd(message, code) {
    if(message.author.id !== config.owner) return;
    try {
        let evaled = eval(code);
        if (typeof evaled !== "string")
            evaled = util.inspect(evaled);
            message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
function clean(text) {
    if (typeof(text) !== 'string') {
        text = util.inspect(text, { depth: 0 });
    }
    text = text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
        .replace(config.token, 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0');
    return text;
}

process.on('uncaughtException', (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.error('Uncaught Exception: ', errorMsg);
});

process.on('unhandledRejection', err => {
    console.error('Uncaught Promise Error: ', err);
});

// bot.login(config.token);
bot.login(process.env.BOT_TOKEN);
