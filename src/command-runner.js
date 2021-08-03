const boxen = require('boxen');

const { init } = require("./db/init");
const { showHelp, getTodaysDatestamp } = require("./utils");
const prompt = require('./prompt/prompts');
const { addNewTask, deleteTask, markTaskDone, getTodaysTasks } = require('./db/mongoController');

const commandRunner = {};

commandRunner.run = async (command, args) => {
	await init.initializeStorage();
	switch (command) {
		case 'add':
			await commandRunner.runAdd(args)
			break;
		case 'done':
			await commandRunner.runDone();
			break;
		case 'list':
			await commandRunner.runList();
			break;
		case 'export':
			await commandRunner.runExport(args);
			break;
		case 'delete':
			await commandRunner.runDelete();
			break;
		case 'help':
			await commandRunner.runHelp();
			break;
		case 'version':
			await commandRunner.runVersion();
			break;
		default:
			break;
	}
	console.log('\n');
};
commandRunner.runAdd = async (args) => {
	if (args.length === 0 || args.length > 1) {
		console.log(`  [ERROR] - For 'add' command, you must specify one and only one task. Use double quotes to wrap your task description.`);
		showHelp();
	}
	const done = await addNewTask(args[0]);
	if (!done) {
		console.log(`  * [error] - Unable to add task.`);
	} else {
		console.log(` Successfully added task.`);
		await commandRunner.runList();
	}
};
commandRunner.runDone = async () => {
	let undoneTasks = await getTodaysTasks();
	undoneTasks = undoneTasks.filter((task) => task.state === 'PENDING');
	const doneTask = await prompt.done(undoneTasks);
	await markTaskDone(doneTask);
	await commandRunner.runList();
};
commandRunner.runList = async () => {
	const tasks = await getTodaysTasks();
	console.log(boxen(`    Today's Tasks    `, {padding: 1, margin: 1}));
	console.log(` Date: ${getTodaysDatestamp()}`);
	console.log(` Tasks: ${tasks.length}\n`);
	if (tasks.length === 0) {
		console.log('\n\n  You have not logged any tasks yet.');
		return;
	}
	tasks.forEach((task) => {
		if (task.state === 'DONE') {
			console.log(`  [Done] -\t${task.task}`);
		} else if (task.state === 'PENDING') {
			console.log(`  [Pending] -\t${task.task}`);
		}
	});
};
commandRunner.runExport = (duration) => {

};
commandRunner.runDelete = async () => {
	const allTasks = await getTodaysTasks();
	const taskToDelete = await prompt.delete(allTasks);
	await deleteTask(taskToDelete);
	await commandRunner.runList();
};
commandRunner.runHelp = () => {
	showHelp();
};
commandRunner.runVersion = () => {
	const pJson = require('../package.json');
	console.log(`\nTasko Version: v${pJson.version}`);
};
module.exports = commandRunner;
