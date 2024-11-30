const header = `👑 PRIME 𝗩𝗜𝗣 𝗨𝗦𝗘𝗥𝗦 👑`;

const fs = require("fs");

const vipFilePath = "vip.json";

function loadVIPData() {
  try {
    const data = fs.readFileSync(vipFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading VIP data:", err);
    return {};
  }
}

function saveVIPData(data) {
  try {
    fs.writeFileSync(vipFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error saving VIP data:", err);
  }
}

module.exports = {
  config: {
    name: "viplist",
    version: "1.0",
    author: "jay",
    role: 0,
    category: "Config",
    guide: {
      en: "{pn} viplist - List all VIP users",
    },
  },

  onStart: async function ({ api, event, message, usersData }) {
    // Load VIP data from the JSON file
    const vipData = loadVIPData();

    const vipList = await Promise.all(
      Object.keys(vipData).map(async (uid) => {
        const userData = await usersData.get(uid);
        const userName = userData ? userData.name : "Unknown User";
        return `〽️ [ ${userName} ]\n➡️ [ ${uid} ]`;
      })
    );

    if (vipList.length > 0) {
      message.reply(`${header}

» 👑 𝗢𝗨𝗥 𝗥𝗘𝗦𝗣𝗘𝗖𝗧𝗘𝗗 𝗩𝗜𝗣 𝗨𝗦𝗘𝗥𝗦 𝗟𝗜𝗦𝗧 👑:
${vipList.join(`
`)}`);
    } else {
      message.reply(`${header}
The VIP list is currently empty 😭.`);
    }
  },
};
