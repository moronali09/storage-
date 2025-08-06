const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');
const fs = require('fs');
const bot = new TelegramBot('8378393332:AAGhkusZXFW7Yh4--BZT48EpQc64F1EKPhM', { polling: true });

bot.onText(/\/download (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const query = match[1];
  const filename = `download_${Date.now()}.mp3`;

  // Inform user
  bot.sendMessage(chatId, `🔄 Downloading: ${query}`);

  // yt-dlp দিয়ে MP3 ডাউনলোড
  exec(`yt-dlp -x --audio-format mp3 -o "${filename}" "${query}"`, (err) => {
    if (err || !fs.existsSync(filename)) {
      return bot.sendMessage(chatId, '❌ Download failed.');
    }
    // GoatBot-এ ফেরত পাঠানোর জন্য ফাইল ID পাওয়ার আগে upload করতে হবে
    bot.sendAudio(chatId, fs.createReadStream(filename))
      .then(() => fs.unlinkSync(filename))
      .catch(() => bot.sendMessage(chatId, '❌ Upload failed.'));
  });
});
    
