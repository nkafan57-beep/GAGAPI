// ==== المتطلبات ====
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const axios = require('axios');

// ==== إعداد API ====
const app = express();
const PORT = process.env.PORT || 10000;

// مثال endpoint للـ stock
app.get('/stock', (req, res) => {
    // هاذي مجرد بيانات مثال، تقدر تعدلها حسب الحاجة
    const stockData = [
        { name: "Item1", quantity: 10 },
        { name: "Item2", quantity: 5 },
        { name: "Item3", quantity: 20 }
    ];
    res.json(stockData);
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});

// ==== إعداد البوت ====
const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

bot.on('ready', () => {
    console.log(`Bot logged in as ${bot.user.tag}`);
});

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === "!stock") {
        // يستدعي بيانات الـ API من نفس المشروع
        try {
            const response = await axios.get(`http://localhost:${PORT}/stock`);
            const stockList = response.data.map(item => `${item.name}: ${item.quantity}`).join("\n");
            message.channel.send(`📦 Stock:\n${stockList}`);
        } catch (err) {
            console.error(err);
            message.channel.send("حدث خطأ عند جلب بيانات المخزون!");
        }
    }
});

// تسجيل دخول البوت باستخدام التوكن المخزن في متغيرات البيئة
bot.login(process.env.TOKEN);
