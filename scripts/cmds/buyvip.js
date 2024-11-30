const fs = require("fs");

const vipFilePath = "vip.json";
const vipCost = 100000000; // VIP cost

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
    name: "buyVIP",
    version: "1.0",
    author: "jay",
    role: 0,
    shortDescription: {
      en: "Buy VIP membership."
    },
    longDescription: {
      en: "Buy VIP membership for exclusive benefits."
    },
    category: "VIP",
    guide: {
      en: "{pn} - View VIP benefits and cost\n{pn} confirm - Confirm VIP purchase\n{pn} refund - Request a VIP refund"
    }
  },
  onStart: async function ({ api, event, args, message, usersData }) {
    const senderID = event.senderID;
    const userData = await usersData.get(senderID);
    const vipData = loadVIPData();

    if (vipData[senderID]) {
      if (args[0] === "refund") {
        userData.money += vipCost;
        delete vipData[senderID]; // Remove user from VIP data
        saveVIPData(vipData); // Save updated VIP data
        usersData.set(senderID, userData); // Update usersData with money and VIP status
        message.reply(`🔄 VIP Refund Requested 🎁\n\nYou've requested a refund for your VIP membership. You will receive ${vipCost} coins.`);
      } else {
        message.reply(`👑 𝗩𝗜𝗣 𝗨𝗦𝗘𝗥 👑\n\n☯️ 𝗔𝗟𝗥𝗘𝗔𝗗𝗬 𝗩𝗜𝗣\nYou are already a VIP member! Enjoy the exclusive benefits.\n\nℹ️ 𝗔𝗗𝗠𝗜𝗡  𝗖𝗢𝗡𝗧𝗘𝗖𝗧 \n\n 💢 Please Contect Our Bot Admins If you face any problem.\n\n📚 𝗙𝗘𝗘𝗗𝗕𝗔𝗖𝗞 📚 \n💬 Please Give Your Feedback to admins just Type [ .callad ] < commant > then send...\n\n🙏 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 🙏\n🔘 Thank you for purchasing our VIP subscription\n\n🤘𝗘𝗡𝗝𝗢𝗬𝗜𝗡𝗚 🤘\nI hope you are enjoying with your extra achieve benefits 🎁`);
      }
    } else {
      if (!args[0]) {
        // Show VIP benefits and cost
        message.reply(`👑 𝗩𝗜𝗣 𝗠𝗘𝗠𝗕𝗘𝗥𝗦𝗛𝗜𝗣 🎁\n\n🎁 𝗩𝗜𝗣 𝗕𝗘𝗡𝗘𝗙𝗜𝗧𝗦 :\n\n➖ 🎶 𝐀𝐂𝐂𝐄𝐒𝐒 𝐌𝐔𝐒𝐈𝐂 𝐂𝐎𝐌𝐌𝐀𝐍𝐃\n➖🥰 𝐔𝐍𝐋𝐎𝐂𝐊 𝐏𝐀𝐈𝐑 𝐂𝐎𝐌𝐌𝐀𝐍𝐃\n➖ 🤤 𝐔𝐍𝐋𝐎𝐂𝐊 𝐒𝐇𝐎𝐓𝐈 𝐂𝐎𝐌𝐌𝐀𝐌𝐃\n➖ 𝐔𝐍𝐋𝐎𝐂𝐊 NIPSEY 𝐂𝐎𝐌𝐌𝐀𝐍𝐃\n➖ 🔓 𝐀𝐋𝐋 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒 𝐔𝐍𝐋𝐎𝐂𝐊\n\n🏧 𝗩𝗜𝗣 𝗖𝗢𝗦𝗧 :-  ${vipCost}$ dollars 💰\n\n𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗧𝗜𝗢𝗡 :- 💠 PLEASE PURCHASE OUR VIP SUBSCRIPTION FOR UNLOCK OUR MORE VIP FEATURES 🎁 \n\n🔮 𝗧𝘆𝗽𝗲 :- [ .buyVIP confirm ] to confirm  purchase our VIP Subscription 💛`);
      } else if (args[0] === "confirm") {
        if (userData.money >= vipCost) {
          userData.money -= vipCost;
          vipData[senderID] = true; // Add user to VIP data
          saveVIPData(vipData); // Save updated VIP data
          usersData.set(senderID, userData); // Update usersData with money and VIP status
          message.reply(`👑 VIP Membership Purchased 🎉\n\n😍 Thank You For purchasing Our VIP Subscription\n\n 💎 You are now a VIP member! Enjoy the exclusive benefits\n\n🔓 YOUR ALL COMMANDS HAS BEEN UNLOCKED.\n\n🔶🔶🔶🔶ENJOY🔶🔶🔶🔶`);
        } else {
          message.reply("👑 𝗩𝗜𝗣 𝗨𝗦𝗘𝗥 👑 \n\n❌ Insufficient funds to purchase VIP.\n🥱 Check your balance first\n😺 Type [ .bal ] to check your balance\n🎟️ Add Money in your wallet\n👑 Play Quiz type [ .quiz ] to earn money\n🎀 Then Buy our VIP membership\n\n🔮 To confirm your membership type [ .buyvip confirm ]\n\n To cancel your membership type [ .buyvip cancel ]");
        }
      } else if (args[0] === "refund") {
        message.reply("❌ You are not a VIP member, and there's nothing to refund.");
      }
    }
  }
};
