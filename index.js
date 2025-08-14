const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// توكن البوت من متغير البيئة
const TOKEN = process.env.TOKEN;

// ID السيرفر والقناة اللي يبغى يرسل فيها الستوك
const GUILD_ID = 'هنا حط ID السيرفر';
const CHANNEL_ID = 'هنا حط ID القناة';

// البيانات اللي تبغى تراقبها في الستوك
let stockItems = [
  { name: "Item1", quantity: 10 },
  { name: "Item2", quantity: 5 },
  // ممكن تضيف أكثر
];

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  const channel = client.guilds.cache.get(GUILD_ID)?.channels.cache.get(CHANNEL_ID);
  if (!channel) return console.log("القناة مو موجودة");

  // تحديث الستوك كل 30 ثانية كمثال
  setInterval(() => {
    let message = "**تحديث الستوك:**\n";
    stockItems.forEach(item => {
      message += `${item.name}: ${item.quantity}\n`;
    });
    channel.send(message);
  }, 30000); // 30000ms = 30 ثانية
});

client.login(TOKEN);        // يستدعي بيانات الـ API من نفس المشروع
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
