function demoHeavyTask() {
    let res;
    for (let i = 0; i < 3e9; i ++) {
        res += i;
    }
}

module.exports = demoHeavyTask;