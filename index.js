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
    bot.user.setGame('Under development ;)'); //you can set a default game
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
        if (cmd === 'verify') {
            message.delete(1000);
            var role = message.guild.roles.find('name', 'NRC Geverifieerd');
            message.member.addRole(role.id);
            var verify_embed = {
                "embed": {
                    "title": "NRC Geverifieerd",
                    "description": "Bij deze is "+ message.author +" geverifieerd op de discord server, vanaf nu heb je de " + role + " rol!",
                    "url": "http://nrc-rp.nl",
                    "color": 7452572,
                    "footer": {
                        "text": "Copyright © nrc-rp.nl | All rights reserved"
                    },
                    "thumbnail": {
                        "url": "https://lh3.googleusercontent.com/rkQNZYSjsIhpldcGaI1UbRiousONg9d2M4JMhDXG3JDKGSUOEuxoRtjrEi0g7m95YmgBig=s85"
                    },
                    "fields": [
                        {
                            "name": "Hoe?",
                            "value": "Gebruik !verify in dit kanaal, "
                        },
                        {
                            "name": "Informatie",
                            "value": "Met deze rol kun je bepaalde kanalen zien en het development van NRC volgen. Ook krijg je later toegang tot exclusieve dingen en events."
                        }
                    ]
                }
            };
// message.author + ' is toegevoegd aan de ' + role
            message.channel.send(verify_embed);
        }
        // bot.on('message', message => {
        //     if(message.author.bot)
        //     {
        //         if(message.embeds)
        //         {
        //             const embed = message.embeds.find(msg => msg.title === 'NRC Development Updates');
        //             if (message.embeds){
        //                 embed.message.react('☑')
        //                     .then(reaction => console.log("Reactie geplaatst aan het bericht"))
        //                     .catch(err => console.error())
        //             }
        //         }
        //     }
        // });
        // if (cmd === 'vraagrol') {
        //         // message.delete(2000);
        //     const embed = new Discord.RichEmbed();
        //     const developer = '567770915056648192';
        //     embed.setTitle("NRC Development Updates");
        //     embed.setColor("RED");
        //     embed.setDescription("We hebben een kanaal aangemaakt om de voortgang van NRC te delen, er is een Trello bord aangemaakt waarop je precies kan zien waar we momenteel mee bezig zijn. \nDoor te reageren op de emoji word je automatisch toegevoegd aan een rol. Deze rol geeft je toegang tot het kanaal waar alle Trello updates in komen te staan.");
        //     embed.setURL("https://trello.com/b/Jwc7GBrA/nrc-development-sheet");
        //     embed.setFooter("Voor vragen, of als je bugs/toevoegingen wilt delen kun je Wessel een bericht sturen!");
        //     message.channel.send(embed);
        // }
        // bot.on('messageReactionAdd', (reaction, user) => {
        //     if (user.bot)
        //         return;
        //     var role = '614025548724830210';
        //     var member = reaction.message.guild.members.find(member => member.id === user.id);
        //     // member.addRole(role).then(member => {
        //     //     console.log(member.user.username + "Toegevoegd aan een rol")
        //     // }).catch(err => console.error)
        //     if (member.roles.has(role)){
        //         member.removeRole(role).then(member => {
        //             console.log("Gebruiker heeft de rol niet meer")
        //         }).catch(err => console.error)
        //     }
        //     else {
        //         member.addRole(role).then(member => {
        //             console.log("Gebruiker heeft de rol")
        //         }).catch(err => console.error);
        //     }
        // });
        if (cmd === 'website') {
            message.delete(1000);
            return message.channel.send('De website van NRC: http://nrc-rp.nl');
        }
        else if (cmd === 'discord') {
            message.delete(1000);
            return message.channel.send('De discord van NRC: https://discordapp.com/invite/MMpPav3');
        }
        else if (cmd === 'ip') {
            message.delete(1000);
            return message.channel.send('De server staat nog niet online, binnenkort! ;)');
        }
        else if (cmd === 'spam') {
            message.delete(1);
            return message.author.send('waarom zou je dat willen 0.o');
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