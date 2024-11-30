module.exports = {
  config: {
    name: "trivia",
    aliases: ["starttrivia", "game"],
    version: "1.0",
    author: "Jay",
    countdown: 5,
    role: 0,
    shortDescription: {
      en: "Start a trivia game",
      tl: "Simulan ang trivia game",
    },
    longDescription: {
      en: "Starts a trivia game where you guess the correct answers to trivia questions",
      tl: "Simulan ang isang trivia game kung saan kailangan mong tama na sagutin ang mga trivia na tanong",
    },
    category: "goatBot",
    guide: {
      en: "{p}trivia",
      tl: "{p}trivia",
    },
  },

  triviaData: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Madrid", "Rome"],
      answer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Jupiter", "Saturn", "Neptune", "Mars"],
      answer: "Jupiter"
    }
    // Add more trivia questions here
  ],

  onStart: async function ({ message }) {
    // Code to start the trivia game
    const triviaQuestion = this.getRandomTriviaQuestion();
    message.reply(`The trivia game has started! Get ready to answer some questions.\nQuestion: ${triviaQuestion.question}\nOptions: ${triviaQuestion.options.join(', ')}`);
  },

  getRandomTriviaQuestion: function () {
    const randIndex = Math.floor(Math.random() * this.triviaData.length);
    return this.triviaData[randIndex];
  }
};
