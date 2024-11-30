const axios = require("axios");
const fs = require("fs");

const vipFilePath = "vip.json";

function loadVIPData() {
  // Function to load VIP data from vip.json
  try {
    const data = fs.readFileSync(vipFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading VIP data:", err);
    return {};
  }
}

module.exports = {
  config: {
    name: "spin",
    version: "1.0",
    author: "Jay",
    countDown: 0,
    role: 0,
    shortDescription: {
      vi: "Quay vòng quay để kiếm tiền",
      en: "Spin the spinner to earn money",
    },
    longDescription: {
      vi: "Quay vòng quay ảo để kiếm tiền ảo.",
      en: "Spin the spinner to earn virtual money.",
    },
    category: "spinning",
    guide: {
      vi: "{pn}: Bắt đầu quay vòng quay",
      en: "{pn}: no",
    },
  },

  onStart: async function ({ message, usersData, event, getLang }) {
    const vipData = loadVIPData(); // Load VIP data from vip.json
    const blockedCommands = ["spin"]; // List of commands that require VIP access

    if (blockedCommands.includes(this.config.name)) {
      // Check if the user's UID is in the VIP list
      if (!vipData[event.senderID]) {
        message.reply("⛔ 𝗩𝗜𝗣 𝗔𝗟𝗘𝗥𝗧 ⛔\n\n⚠ 𝗔𝗟𝗘𝗥𝗧 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡\n 🚫 You are not a VIP user. First, buy our VIP subscription to use this command\n\n💹 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨\nThanks for interacting with our command. We hope to implement this command to make it better.\n\n👑 𝗕𝗨𝗬 𝗩𝗜𝗣\n💎 Buy VIP membership for free, just type [ .buyvip ] to purchase our free subscription\n\n𝗠𝗢𝗥𝗘 𝗢𝗣𝗧𝗜𝗢𝗡𝗦\n🎀 [ .quiz ] - play the quiz and win money\n🎰 [ .slot ] - bet your amount for a chance to win double money\n☯ [ .spin ] - Spin the spinner and earn money.");
        return; // Exit the function to prevent the command from executing
      }
    }
    const spinCost = 10000;
    const minWin = 1000;
    const maxWin = 1000;

    const userData = await usersData.get(event.senderID);

    if (userData.money < spinCost) {
      return message.reply("🎀 Nipsey 𝗕𝗮𝗯𝘆 :\n\n:\n\n🏧 Please Check Your Balance \n\nBET AMOUNT NEEDED IS = ${spinCost} 💸 Dollars, but the Spin service is currently unavailable.\n\n- Bot Admin Jay D Bohol\n[Facebook Profile](https://www.facebook.com/profile.php?id=61550037082227)\n👑 You can also request VIP status from him.");
    }

    await usersData.set(event.senderID, {
      money: userData.money - spinCost,
    });

    const moneyWon = Math.floor(Math.random() * (maxWin - minWin + 1) + minWin);

    await usersData.set(event.senderID, {
      money: userData.money + moneyWon,
    });

    return message.reply(`🎯 𝗦𝗣𝗜𝗡𝗡𝗜𝗡𝗘𝗥 🎯\n\n🎁 Congratulations!\n\n💸 Bet amount = ${spinCost} 💸 dollars\n\n🎁 Amount won by spinning the spinner.\n\n🎁 Won amount is [ ${moneyWon}💰 ]💸\n\n - 🎟 Nipsey SPINNING\n\n 📝  Your balance is now [ ${userData.money} dollars💰 ]`);
  },
};
