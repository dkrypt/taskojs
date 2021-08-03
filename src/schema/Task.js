const { getTodaysDatestamp, hashCode } = require("../utils");

class Task {
    constructor(task, state) {
        this.task = task;
        this.state = state;
        this.timestamp = getTodaysDatestamp();
        this.hashCode = hashCode(this.task);
    }
    toString() {
        return {
            hash: this.hashCode,
            task: this.task,
            state: this.state,
            timestamp: this.timestamp
        }
    }
};

module.exports = Task;
