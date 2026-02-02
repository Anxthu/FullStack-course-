const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter numbers separated by space: ', (input) => {
    const numbers = input.split(' ').map(Number);
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    }

    console.log('The sum of elements is:', sum);
    rl.close();
});
