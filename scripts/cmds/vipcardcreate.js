module.exports = {
  config: {
    name: "vipcardcreate",
    aliases: [],
    version: "1.0",
    author: "Liane & Nico",
    countDown: 5,
    category: "config",
    role: 0,
    shortDescription: {
      en: "View bot usage guide",
    },
  },

  onStart: async function ({ message, event, usersData }) {
    const args = event.body.split(" ");

    if (args.length === 1) {
      // Handle "vipcardcreate" command
      const randomVIPID = Math.floor(Math.random() * (644382328393 - 144467543566 + 1)) + 144467543566;
      const senderID = event.senderID;
      const userData = await usersData.get(senderID);
      const nameUser = userData ? userData.name : "Unknown User"; // Define nameUser here using userData
      const responseMessage = `Replying To: ${nameUser}\n\nPassword *******(if new phone please add password)\n\nVIP ID 💳: ${randomVIPID}\n\n (Please copy and add it to your notes if you are new so you won't forget)`;

      message.reply(responseMessage);
    } else {
      // Handle other cases (e.g., if additional arguments are provided)
      message.reply("Invalid command. Please use the command without any arguments.");
    }
  },
};
