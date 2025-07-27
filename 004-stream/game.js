const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs')
const path = require('path')
const readline = require('readline')

let logFile

const argv = yargs(hideBin(process.argv))
    .option('file', {
        alias: 'f',
        type: 'string',
        description: 'Имя файл для логирования результатов каждой партии',
        default: 'log.json'
    })
    .argv



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


if (argv.file || argv.f) {

    logFile = path.join(__dirname, argv.file || argv.f)

}

if (!logFile) return


function fileCheck(callback) {
    fs.readFile(logFile, 'utf-8', (err, data) => {
        if (err) {

            if (err.code === 'ENOENT') {
                fs.writeFile(logFile, '[]', (err) => {
                    if (err) throw Error(err)
                    console.log('Создан новый лог-файл')
                    callback('[]')
                })
            } else {
                throw Error(err)
            }

        } else {
            callback(data)
        }

    })
}

function appendLog(entry) {

    fileCheck((data) => {

        let logs = []

        try {
            logs = JSON.parse(data)
        } catch (parseErr) {
            logs = []
        }
        logs.push(entry)

        fs.writeFile(logFile, JSON.stringify(logs, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Ошибка записи в лог:', err)
            }
        })
    })


}

function startGame() {

    const hiddenNumber = Math.floor(Math.random() * 2) + 1

    rl.question('Угадай число (1 - Орёл, 2 - Решка)', (input) => {

        if (input.toLowerCase() === 'stop') {
            console.log('Выход из игры.')
            rl.close()
            return
        }

        const inputValue = Number(input)


        if (inputValue !== 1 && inputValue !== 2) {
            console.log('Ведити 1 или 2')
            return startGame()

        }

        const result = inputValue === hiddenNumber
        console.log(result ? 'Угадал' : 'Не угадал')

        const entry = {
            time: new Date().toISOString(),
            hiddenNumber: hiddenNumber,
            inputValue: inputValue,
            result: result
        }

        appendLog(entry)

        startGame()
    })
}


startGame()