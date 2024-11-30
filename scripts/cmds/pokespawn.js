const fetch = require("node-fetch");
const levenshtein = require("fast-levenshtein"); 

const globalData = {
  fff: [],
};

module.exports = {
  config: {
    name: "pokespawn",
    version: "1.2",
    author: "Shikaki\Pokemon data: Ausum",
    countDown: 20,
    role: 0,
    shortDescription: "Spawn a Pokémon and guess name.",
    longDescription: "Spawn a pokemon, reply with the partial of fully correct name, and earn money and exp",
    category: "🐍 Pokemon",
    guide: "{pn}",
  },

  onStart: async function ({ message, event }) {
    try {
      const response = await fetch("https://raw.githubusercontent.com/theone2277/pokos/main/pokeData");
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
      }

      const pokos = await response.json();

      const ind = getRandom(pokos, []);
      try {
        const form = {
          body: "🐍 A wild Pokémon appeared!\\Get free coins and exp by replying with the correct Pokémon name.",
          attachment: await global.utils.getStreamFromURL(pokos[ind].image),
        };
        message.reply(form, (err, info) => {
          globalData.fff.push(info.messageID);
          global.GoatBot.onReply.set(info.messageID, {
            commandName: "pokespawn",
            mid: info.messageID,
            name: pokos[ind].name,
            ind: ind,
          });

          setTimeout(() => {}, 1000);
        });
      } catch (e) {
        console.error("Error in pokespawn:", e);
        message.reply('Server busy. Please try again later.');
      }
    } catch (error) {
      console.error("Error in pokespawn:", error);
      message.reply("An error occurred. Please try again later.");
    }
  },

  onReply: async ({ event, api, Reply, message, getLang, usersData }) => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/theone2277/pokos/main/pokeData");
      if (!response.ok) {
        throw new Error(`Failed to fetch Pokémon data: ${response.statusText}`);
      }

      const pokos = await response.json();
      const userId = event.senderID;
      const userReply = event.body.toLowerCase();

      let closestMatch = pokos[0].name;
      let closestDistance = levenshtein.get(userReply, pokos[0].name);

      for (const pokemon of pokos) {
        const distance = levenshtein.get(userReply, pokemon.name);
        if (distance < closestDistance) {
          closestMatch = pokemon.name;
          closestDistance = distance;
        }
      }

      const distanceThreshold = 1;
      if (closestDistance <= distanceThreshold) {
        const rewardCoins = 10000;
        const rewardExp = 100;

        const userData = await usersData.get(userId);
        await usersData.set(userId, {
          money: userData.money + rewardCoins,
          exp: userData.exp + rewardExp,
          data: userData.data,
        });

        const capitalizedName = closestMatch.charAt(0).toUpperCase() + closestMatch.slice(1);

        message.reply(`📣 Congratulations! You guessed the Pokémon ${capitalizedName} correctly.\\You've been rewarded with $${rewardCoins} and ${rewardExp} exp.`);

        api.unsendMessage(Reply.mid);
      } else {
        message.reply("❌ Wrong answer.");
      }
    } catch (error) {
      console.error("Error in onReply:", error);
      message.reply("An error occurred. Please try again later.");
    }
  },
};

function getRandomInt(arra) {
  return Math.floor(Math.random() * arra.length);
}

function getRandom(arra, excludeArrayNumbers) {
  let randomNumber;

  if (!Array.isArray(excludeArrayNumbers)) {
    randomNumber = getRandomInt(arra);
    return randomNumber;
  }

  do {
    randomNumber = getRandomInt(arra);
  } while ((excludeArrayNumbers || []).includes(randomNumber));

  return randomNumber;
}