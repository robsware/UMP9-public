const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const cron = require('cron')
const WebSocket = require('ws');
const discord_token = process.env.DISCORD_TOKEN;
var shell = require('shelljs');
const request = require(`request`);
const { Stream } = require('stream');
const path = require('path');
const fs = require('fs');
process.on('uncaughtException', function (err) {
    console.error(err);
    console.log("Crashn't");
  });


client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


if (!discord_token) {
    console.log("DISCORD_TOKEN is empty. Please run \"export DISCORD_TOKEN=<your token here>\", then try again.");
    process.exit();
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


client.on('ready', function(){
    console.log("UMP9, ready for deployment!");

    let serverList = ''
    client.guilds.cache.forEach((guild) => {
        serverList = serverList.concat(" - " + guild.name + ": ID: " + guild.id + "\n")
    })

    console.log(serverList)


    //TODO: Could add different statuses and randomly change between them every few hours
    client.user.setPresence({
        status: 'idle',
        activity: {
            name: 'terrible anime',
            type: 'WATCHING'
        }
    });

    const job = cron.job('01 00 14 * * 1', function() {
        client.channels.cache.get('653719279111372810').send("Commanders, don't forget to renew your exploration squad!");
        job.stop();
    });

    job.start();

    const job4 = cron.job('01 00 10 * * 1', function() {
        client.channels.cache.get('653719279111372810').send("Commanders, it's a new week! Don't forget to share and let's do our best!");
        job4.stop();
    });

    job4.start();

    //empty image folder every day
    const job2 = cron.job('01 00 12 * * *', function() {
        var fs = require("fs");
        const directory = 'deepImages'
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
          
            for (const file of files) {
              fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
              });
            }
          });
        job2.stop();
    });

    job2.start();

});

client.on('message', function(message){
    if (message.member.permissions.has("SEND_MESSAGES", "READ_MESSAGE_HISTORY")){



            
            //if (message.author.bot) {
            //    return;
            //}


            var mess = message.content;

            if (mess.includes(':3')) {
                if (message.author.bot) {
                    return;
                }
                message.channel.send(":3");
                return;
            }

            var rando = getRandomInt(90000) + 5000;
            var chance = getRandomInt(1000) + 1;
            var chance2 = getRandomInt(50) + 1
            var randomHour = getRandomInt(23);
            var randomMinute = getRandomInt(59);

            
            client.user.setPresence({
                status: 'online',
                activity: {
                    name: 'you',
                    type: 'WATCHING'
                }
            });

            if (chance == 1){
                setTimeout(function() {
                    message.channel.send('*pats* ' + message.author.toString() + " :3");
                }, rando);
            }

            if (chance2 == 1){
                const job3 = cron.job('00 ' + randomMinute + ' ' + randomHour + ' * * *', function() {
                    message.channel.send(":3");
                    console.log(randomMinute)
                    console.log(randomHour)
                    var randomHour = getRandomInt(23);
                    var randomMinute = getRandomInt(59);
                    job3.stop()
                    console.log(randomMinute)
                    console.log(randomHour)
                });
                job3.start()
            }

 
            var spawn = require('child_process').spawn

            const restartProcess = () => {
                spawn(process.argv[0], process.argv.slice(1), {
                    detached: true,
                    stdio: ['ignore']
                }).unref()
                process.exit()
            }

            if (message.mentions.has(client.user)
                || message.cleanContent.startsWith('!')) {

                // IDK
                if (mess.includes('!help')) {
                    message.channel.send(
                        "Try some of these commands:\n" +
                        "!help, !flash, !smug, !hype, !show me (something) !danger, !wrong, " +
                        "!memes, !flip (a coin), !whack (to restart), !roll x (dice), " +
                        "!fortune, !416dance, !danger, !monday, !smug, !flood\n" +
                        "\n" +
                        "Soundboard:\n" +
                        "!soplaugh, !DA NYA, !gameover, !presentday, !emergency, !triggered, " +
                        "!vice, !bossbattle, !ugly, !whip\n" +
                        "\n" +
                        "Otherwise just @ me or ! and text.");
                } else if (mess.includes('!purge')) {
                    if (message.member.permissions.has('MANAGE_MESSAGES')) {
                        var messNum = 1;
                        if (mess.length > 6) {
                            messNum = mess.split(' ')[1];
                        }
                        async function purge() {
                            var fetched = await message.channel.messages.fetch({limit: (messNum < 50 ? (Number(messNum) + 1) : 50)});
                            message.channel.bulkDelete(fetched);
                            console.log("Deleting the last " + fetched.size + " message(s).");
                        }
                        purge();
                    } else {
                        message.channel.send(" ", {
                            files: [
                                "./Assets/Images/yhnph.gif"
                            ]
                        });
                    }
                } else if (mess.match('!p[a,e]t me')) {
                    message.channel.send('*pat pat* ' + message.author.username);
                } else if (mess.match('!(p[a,e]t)+[s]?')) {
                    var patResponses = ["Thank you! I'm trying my best! ♫", ':3 ♫', '❤️'];
                    const patReply = patResponses[getRandomInt(patResponses.length)];
                    message.channel.send(patReply);
                } else if (mess.includes('!whack')) {
                    var painResponses = ['Oww my head ಥ﹏ಥ', 'Why are you doing this to me ( ˃̣̣̥⌓˂̣̣̥ )', 'Not again (つ﹏<)', (" ", {files: ["./Assets/Images/feels9.png"]})];
                    const painReply = painResponses[getRandomInt(painResponses.length)];
                    message.channel.send(painReply).then(async function (message) {
                        await restartProcess();
                    });
                //testing if it can run local scripts. Yes it can!
                } else if (mess.includes('!memes')) {
                    message.channel.send("https://www.youtube.com/watch?v=kQjb-EP2JEE");
                } else if (mess.includes('!flood')) {
                    message.channel.send(":3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n:3\n");
                } else if (mess.includes('!roll')) {
                    var x = mess.split(' ')[1];
                    var rand = getRandomInt(x) + 1;
                    message.channel.send(rand);
                    
                }else if (mess.includes('!flip')) {
                    client.commands.get('flip').execute(message);
                } 
 

                else if (mess.includes('!emergency')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/Energency.mp3' }] });
                } else if (mess.includes('!presentday')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/Present_Day_heh..._Present_Time.mp3' }] });
                } else if (mess.includes('!ugly')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/ugly.mp3' }] });
                } else if (mess.includes('!whip')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/whip.mp3' }] });
                } else if (mess.includes('!gameover')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/SOPMOD_Game_Over.mp3' }] });
                } else if (mess.includes('!bossbattle')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/whiteNyto.mp3' }] });
                } else if (mess.includes('!triggered')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/One_more_group_offended.mp3' }] });
                } else if (mess.includes('!vice')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/Vice_news_disclaimer.mp3' }] });
                } else if (mess.includes('!soplaugh')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/soplaugh.mp3' }] });
                } else if (mess.includes('!DA NYA')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/Nyaaaaa_IDW.mp3' }] });
                } else if (mess.includes('!motivational')) {
                    message.channel.send({ files: [{ attachment: './Assets/Audio/Nothing_is_possible.mp3' }] });
                /* Disabled until fixed. TODO fix
                } else if (mess.includes('!play')) {
                    var voiceChannel = message.member.voice.channel;
                    voiceChannel.join().then(connection => {
                        const dispatcher = connection.play("./Assets/Audio/Vice_news_disclaimer.mp3");
                    }).catch(err => console.log(err));
                */
                // ./Assets/Images/
                } else if (mess.includes('!416dance')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/416dance.gif' }] });
                } else if (mess.includes('!wrong')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/halp.png' }] });
                } else if (mess.includes('!flash')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/flash.png' }] });
                } else if (mess.includes('!show me ')) {
                    var str = mess,
                        delimiter = ' ',
                        start = 2,
                        tokens = str.split(delimiter).slice(start),
                        result = tokens.join(delimiter);

                    message.channel.send("I see " + result, {
                        files:  [{ attachment: './Assets/Images/danger.png' }]
                    });
                } else if (mess.includes('!danger')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/danger.png' }] });
                } else if (mess.includes('!monday')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/mondays.png' }] });
                } else if (mess.includes('!coffee')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/cofee.jpg' }] });
                } else if (mess.includes('!wednesday')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/wednesday.jpg' }] });
                } else if (mess.includes('!nogawed')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/nogawed.jpg' }] });
                } else if (mess.includes('!smug')) {
                    message.channel.send ({ files: [{ attachment: './Assets/Images/smug.jpg' }] });               
                } else if (mess.includes('!hype')) {
                    message.channel.send({ files: [{ attachment: './Assets/Images/hype.gif' }] });
                    
                // ./Assets/Text/
                } else if (mess.includes('!fortune')) {
                    var fs = require("fs");
                    var text = fs.readFileSync("./Assets/Text/fortune.txt") + '';
                    var textByLine = text.split("\n");
                    var result = textByLine[getRandomInt(textByLine.length)];
                    message.channel.send(result);

                /*    
                Removed for now as it was not really used and I can move it to a raspi.
                // DeepDanbooru
                //https://blog.sukasuka.cn/?p=759
                } else if  (mess.includes('!tag')){
                    const fs = require(`fs`);
                    const async = require('async');
                    if (message.attachments.size > 0) {
                        async function start() {
             
                        console.log("This is an image")
                        //Save image
                        const imageIdentifer = Date.now()

                        await new Promise(resolve =>
                            request(message.attachments.first().url)
                              .pipe(fs.createWriteStream(`deepImages/Img-${imageIdentifer}.png`))
                              .on('finish', resolve));

                        var output = shell.exec(`deepdanbooru.exe evaluate --model-path deepdanbooru/model/model-resnet_custom_v4.h5 --tags-path deepdanbooru/model/tags.txt deepImages/Img-${imageIdentifer}.png`).stdout;

                        danbooruResponse = output.split('png:')[1];
                        

                        //console.log("HERE IS OUTPUT")
                        //console.log(output)
                        //console.log("DONE")
                        message.channel.send(danbooruResponse)
                        }
                        start()
                        //message.channel.send(output);

                    }
                */


                    





                } else if (mess.toLowerCase().startsWith('!remindme')) {

                    try {
                        
                        // Variables
                        var returntime;
                        var timemeasure;
                        mess = mess.split(' ');
                        console.log('Message recieved from ' + message.author.id + ' at ' + Date.now().toString());
            
                        // Sets the return time
                        timemeasure = mess[1].substring((mess[1].length - 1), (mess[1].length))
                        returntime = mess[1].substring(0, (mess[1].length - 1))
            
                        // Based off the delimiter, sets the time
                        switch (timemeasure) {
                            case 's':
                                returntime = returntime * 1000;
                                break;
            
                            case 'm':
                                returntime = returntime * 1000 * 60;
                                break;
            
                            case 'h':
                                returntime = returntime * 1000 * 60 * 60;
                                break;
            
                            case 'd':
                                returntime = returntime * 1000 * 60 * 60 * 24;
                                break;
            
                            default:
                                returntime = returntime * 1000;
                                break;
                        }
            
                        // Returns the Message
                        setTimeout(function () {
                            // Removes the first 2 array items
                            mess.shift();
                            mess.shift();
            
                            // Creates the message
                            var content = mess.join();
                            console.log(content)
                            content = content.replaceAll(',', ' ');
                            message.reply(content);
                            console.log('Message sent to ' + message.author.id + ' at ' + Date.now().toString());
                        }, returntime)
                    } catch (e) {
                        message.reply("An error has occured, please make sure the command has a time delimiter and message");
                        console.error(e.toString());
                    }
            
                // List of commands
                }else if (mess.toLowerCase() === "!reminderbot") {
                    message.channel.send("Hello I can help you remember stuff:\n\n!reminderbot \t\tList of all Commands\n\n!remindme \t\t {time} {message}\n\t{time} Please have the amount of time be denoted by a time character.\n\t\tm - minutes, s - seconds, d - days.\n!remind {@User} {time} {message}\n\t{time} Please have the amount of time be denoted by a time character.\n\t\tm - minutes, s - seconds, d - days.\n\t");
                
                // Reminds a specific user
                } else if (mess.toLowerCase().startsWith('!remind')) {
                    try {
                        
                        // Variables
                        var returntime;
                        var timemeasure;
                        var userid;
                        mess = mess.split(' ');
                        console.log('Message recieved from ' + message.author.id + ' at ' + Date.now().toString());
            
                        // Sets the userid for the recipiant
                        console.log(mess[1].replace('<@', '').slice(0, -1))
                        userid = client.users.cache.find(user => user.id === (mess[1].replace('<@', '').slice(0, -1)))
                        console.log(userid)
                        
                        // Sets the return time
                        timemeasure = mess[2].substring((mess[2].length - 1), (mess[2].length))
                        returntime = mess[2].substring(0, (mess[2].length - 1))
            
                        // Based off the delimiter, sets the time
                        switch (timemeasure) {
                            case 's':
                                returntime = returntime * 1000;
                                break;
            
                            case 'm':
                                returntime = returntime * 1000 * 60;
                                break;
            
                            case 'h':
                                returntime = returntime * 1000 * 60 * 60;
                                break;
            
                            case 'd':
                                returntime = returntime * 1000 * 60 * 60 * 24;
                                break;
            
                            default:
                                returntime = returntime * 1000;
                                break;
                        }
            
                        // Returns the Message
                        setTimeout(function () {
                            // Removes the first 2 array items
                            mess.shift();
                            mess.shift();
                            mess.shift();
            
                            // Creates the message
                            var content = mess.join();
                            content = content.replaceAll(',', ' ');
                            message.reply("<@" + userid +"> " + content);
                            console.log('Message sent to ' + userid + ' at ' + Date.now().toString());
                        }, returntime)
                    } catch (e) {
                        message.reply("An error has occured, please make sure the command has a time delimiter and message");
                        console.error(e.toString());
                    }
            


            client.user.setPresence({
                status: 'idle',
                activity: {
                    name: 'terrible anime',
                    type: 'WATCHING'
                }
            })
        } else {
            console.log("No message send permissions in "+ message.channel.name)
            return;
        }
});

client.login(discord_token);

//helpful links
//https://stackoverflow.com/questions/30968984/node-js-how-do-i-retrieve-the-value-of-an-element-within-an-object-array
//https://stackoverflow.com/questions/54000493/how-to-get-the-url-of-an-attachment-in-a-message
//https://stackoverflow.com/questions/45521434/getting-the-url-from-a-submitted-image
//https://stackoverflow.com/questions/50710598/using-discord-js-to-detect-image-and-respond
