const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a number n: ', (n) => {
    const num = parseInt(n);
    console.log('Numbers from 1 to ' + num + ':');
    for (let i = 1; i <= num; i++) {
        console.log(i);
    }
    rl.close();
});
