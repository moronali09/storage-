// getChatId.js
const axios = require("axios");
const TOKEN = "8378393332:AAGhkusZXFW7Yh4--BZT48EpQc64F1EKPhM";

axios.get(`https://api.telegram.org/bot${TOKEN}/getUpdates`)
  .then(res => {
    res.data.result.forEach(u => {
      console.log("chat_id:", u.message.chat.id, "from:", u.message.chat.username || u.message.chat.first_name);
    });
  })
  .catch(err => console.error(err.response?.data || err.message));
