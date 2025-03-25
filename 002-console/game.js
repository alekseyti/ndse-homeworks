const readline = require('readline');



const min = 0;
const max = 100;


function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
const rndInt = randomIntFromInterval(min, max);
console.log(`Загадано число в диапазоне от ${min} до ${max}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const askNumber = () => {
    rl.question('Ваш вариант: ', (input) => {
      const guess = Number(input);
  
      if (Number.isNaN(guess)) {
        console.log('Введите число!');
        askNumber();
        return;
      }
  
      if (guess < rndInt) {
        console.log('Больше');
        askNumber();
      } else if (guess > rndInt) {
        console.log('Меньше');
        askNumber();
      } else {
        console.log(`Отгадано число ${rndInt}`);
        rl.close();
      }
    });
  };
  
  askNumber();