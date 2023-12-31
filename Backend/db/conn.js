const mongoose = require('mongoose');

async function main() {
  try {
    mongoose.set('strictQuery', true);

    await mongoose.connect(
      'mongodb+srv://cassiotenoriosc:NApgfFB5h4uGv9Hn@cluster0.fjldpzt.mongodb.net/?retryWrites=true&w=majority'
    );

    console.log('conectado ao banco meu cumpade');
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}

module.exports = main;
