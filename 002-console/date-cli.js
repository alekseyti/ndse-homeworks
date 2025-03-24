const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const getTimeOptions = (type) => ({
    year: {
      alias: 'y',
      type,
      description: type === 'boolean' ? 'Показать год' : 'Количество лет'
    },
    month: {
      alias: 'm',
      type,
      description: type === 'boolean' ? 'Показать месяц' : 'Количество месяцев'
    },
    date: {
      alias: 'd',
      type,
      description: type === 'boolean' ? 'Показать день' : 'Количество дней'
    }
  });

yargs(hideBin(process.argv))
  .command({
    command: 'current',
    describe: 'Показать текущую дату и время',
    builder: getTimeOptions('boolean'),
    handler: (argv) => {
      const now = new Date();
      if (argv.year) return console.log('Год:', now.getFullYear());
      if (argv.month) return console.log('Месяц:', now.getMonth() + 1);
      if (argv.date) return console.log('День:', now.getDate());
      console.log('Текущая дата и время:', now.toISOString());
    }
  })
  .command({
    command: 'add',
    describe: 'Прибавить к текущей дате',
    builder: getTimeOptions('number'),
    handler: (argv) => {
      const now = new Date();
      if (argv.year) now.setFullYear(now.getFullYear() + argv.year);
      if (argv.month) now.setMonth(now.getMonth() + argv.month);
      if (argv.date) now.setDate(now.getDate() + argv.date);
      console.log('Будущая дата:', now.toISOString());
    }
  })
  .command({
    command: 'sub',
    describe: 'Вычесть из текущей даты',
    builder: getTimeOptions('number'),
    handler: (argv) => {
      const now = new Date();
      if (argv.year) now.setFullYear(now.getFullYear() - argv.year);
      if (argv.month) now.setMonth(now.getMonth() - argv.month);
      if (argv.date) now.setDate(now.getDate() - argv.date);
      console.log('Прошлая дата:', now.toISOString());
    }
  })
  .demandCommand(1, 'Нужно указать хотя бы одну команду: current, add или sub')
  .strict()
  .help()
  .argv;


