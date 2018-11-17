const funct = (callback) => {
    const result = 5;
    callback(result);
}

const x = funct((result) => {
    console.log(result);
});