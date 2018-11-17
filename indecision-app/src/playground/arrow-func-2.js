const multiplier = {
    numbers: [1, 3, 5, 6, 2],
    multiplyBy: 5,
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);
    }
};

console.log(multiplier.multiply());