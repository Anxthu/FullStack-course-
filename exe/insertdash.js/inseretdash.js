function insertDash(num) {
    let str = num.toString();
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += str[i];
        if (i < str.length - 1) {
            let current = parseInt(str[i]) % 2;
            let next = parseInt(str[i + 1]) % 2;
            if (current !== next) {
                result += '-';
            }
        }
    }
    return result;
}


console.log(insertDash(123456));  
console.log(insertDash(24680));   
console.log(insertDash(13579));   
console.log(insertDash(123));     
console.log(insertDash(456));     
