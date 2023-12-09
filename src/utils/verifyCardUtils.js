function getDigitSum(number) {
    let sum = 0;
    while (number > 0) {
        const digit = number % 10;
        sum += digit;
        number = Math.floor(number / 10);
    }
    return sum;
}

function isValidCreditCard(number) {
    if (typeof number !== 'number' || isNaN(number)) {
        return false;
    }
    let sum = 0;
    let count = 0;

    while (number > 0) {
        const digit = number % 10;
        if (count % 2 === 0) {
            sum += digit;
        } else {
            sum += getDigitSum(digit * 2);
        }
        number = Math.floor(number / 10);
        count++;
    }

    return sum % 10 === 0;
}

module.exports = {isValidCreditCard}