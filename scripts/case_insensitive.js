// Make a regex version of a word that makes it case insensitive. Use this when you can't use /i or something else equivalent 

const input = process.argv[2]

const up = s => s.toUpperCase()
const low = s => s.toLowerCase()

const output = input.split('').map(l => `[${low(l)}${up(l)}]`).join('')

console.log(output)