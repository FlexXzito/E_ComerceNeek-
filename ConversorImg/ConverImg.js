const fs = require('fs');
const buffer = fs.readFileSync('./public/1.jpg');
const base64 = buffer.toString('base64');
console.log(base64);