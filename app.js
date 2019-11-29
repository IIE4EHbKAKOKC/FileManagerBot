const Telegraf = require("telegraf");
const Telegram = require("telegraf/telegram")
const telegram = new Telegram("865306376:AAFIguThQER6GCpdGx9pjC1ME3DhQ_rKEWc", {agent:null,webhookReply:true})
const Markup = require("telegraf/markup");
const QRApi = require("./qrAPI");
var filesChatID = "-1001256126457";

const bot = new Telegraf("865306376:AAFIguThQER6GCpdGx9pjC1ME3DhQ_rKEWc");

bot.command ("getQR",(ctx)=>{
    ctx.replyWithPhoto(QRApi.getQrCode(ctx.message.text.slice(7)));
})

bot.command ("start",(ctx)=>{
    if (ctx.message.text.length > 6) {
        const arr = ctx.message.text.split('_');
        if (arr[1] == "id") {
            telegram.forwardMessage(ctx.message.chat.id, filesChatID, arr[2])
        }
    }
})

bot.command ("STCFF",(ctx)=>{ //SetThisChatForFiles
    filesChatID = ctx.message.chat.id;
    console.log(filesChatID);
})

bot.command("saveFile",(ctx)=>{
    //console.log(ctx.message);
    telegram.sendCopy(filesChatID, ctx.message.reply_to_message)
        .then((res)=>{
        toQR(res.message_id,ctx);
    })
});

toQR = (id,ctx) => {
    console.log(id);
    ctx.replyWithPhoto(QRApi.getQrCode("https://t.me/managefilebot?start=_id_"+id));
}

bot.on("text",(ctx)=>{
    const message = ctx.message.text;
    ctx.reply(message);
});

bot.launch();