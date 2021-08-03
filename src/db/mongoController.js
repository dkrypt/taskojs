const Task = require("../schema/Task");
const { taskStatus, hashCode } = require("../utils");
const getDatabase = require("./db");

const controller = {};

/**
 * Adds a new task to DB
 * @param {String} task task to add
 */
controller.addNewTask = async (task) => {
    const database = await getDatabase();
    const taskToAdd = new Task(task, taskStatus.PENDING);
    try {
        await database.insert(taskToAdd.toString());
        return true;
    } catch (error) {
        console.log(error);
    }
    return false;
};

controller.getTodaysTasks = async () => {
    const database = await getDatabase();
    try {
        const allTasks = await database.find({});
        return allTasks;
    } catch (error) {
        throw error;
    }
};

controller.markTaskDone = async (task) => {
    console.log(task);
    const database = await getDatabase();
    const taskHashCode = hashCode(task);
    const updatedTask = new Task(task, taskStatus.DONE);
    await database.update({hash: taskHashCode}, updatedTask.toString(), {returnUpdatedDocs: false});
};

controller.deleteTask = async (task) => {
    const database = await getDatabase();
    const taskHashCode = hashCode(task);
    await database.remove({hash: taskHashCode});
};

module.exports = controller;
