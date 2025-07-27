const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs')
const path = require('path')

let logFile


const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Путь к лог-файлу',
        default: 'log.json'
    })
    .argv


if (argv.file || argv.f) {

    logFile = path.join(__dirname, argv.file || argv.f)

}

if (!logFile) return


fs.readFile(logFile, 'utf-8', (err, data) => {
    if(err) throw Error(err)


    let logs

    try {
        logs = JSON.parse(data)
    } catch(parseErr) {
        throw Error(err)
    }

    if(!Array.isArray(logs)) {
        throw Error(err)
    }

    const totalGames = logs.length
    const wins = logs.filter(entry => entry.result === true).length
    const losses = totalGames - wins
    const winRate = totalGames > 0 ? ((wins / totalGames) * 100).toFixed(2) : '0.00'

    console.log(`Всего игр ${totalGames}`)
    console.log(`Побед: ${wins}`)
    console.log(`Поражений: ${losses}`)
    console.log(`Процент побед: ${winRate}`)
})