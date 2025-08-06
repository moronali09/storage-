const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');

// তোমার Bot Token
const TOKEN = '8378393332:AAGhkusZXFW7Yh4--BZT48EpQc64F1EKPhM';
const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/download (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];
  const filename = `yt_${Date.now()}.mp3`;

  // ইউজারকে স্টার্ট মেসেজ
  bot.sendMessage(chatId, `🔄 Downloading: ${query}`);

  // yt-dlp দিয়ে MP3 ডাউনলোড
  exec(`yt-dlp -x --audio-format mp3 -o "${filename}" "${query}"`, (err) => {
    if (err || !fs.existsSync(filename)) {
      return bot.sendMessage(chatId, '❌ Download failed.');
    }
    // GoatBot-এ পাঠানোর জন্য файl ID পাওয়া যাবে upload করে
    bot.sendAudio(chatId, fs.createReadStream(filename))
      .then(() => {
        fs.unlinkSync(filename);
      })
      .catch(() => {
        bot.sendMessage(chatId, '❌ Upload failed.');
      });
  });
});
