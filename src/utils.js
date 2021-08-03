const fs = require('fs');
const utils = {};

utils.showHelp = () => {
	console.log('\n  Usage: tasko [command] [args]');
	console.log();
	console.log('   a, add	: Add new task');
	console.log('   d, done	: Mark task as done');
	console.log('   l, list	: List today\'s tasks');
	console.log('   e, export [duration]	: Export tasks to .txt file');
	console.log('   del, delete	: Delete task');
	console.log('   h, help	: Show help');
	console.log('   v, version: Show version for tasko');
};

utils.showWelcome = () => {
	const banner = fs.readFileSync('src/resources/banner.txt', {encoding: 'utf-8'});
	console.log(banner);
};

utils.getTodaysDatestamp = () => {
	const date = new Date();
	return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};

utils.getFilename = () => {
	const date = new Date();
	return `tasko-${date.getDate()}-${date.getMonth() +1}-${date.getFullYear()}.db`;
};

const createCountHashMap = (tasks) => {
	const map = new Map();
	tasks.forEach((task) => {
		const taskHash = utils.hashCode(task);
		if (map.has(taskHash)) {
			map.set(taskHash, map.get(taskHash) + 1);
		} else {
			map.set(taskHash, 1);
		}
	});
	return map;
};
utils.getFilteredTasks2 = (allTasks) => {
	// Grab each type of entry and remove their identifier.
	let done = allTasks.filter((task) => task.startsWith('*'));
	done = utils.removeTaskIdentifier(done);
	let undone = allTasks.filter((task) => task.startsWith('#'));
	undone = utils.removeTaskIdentifier(undone);
	let deleted = allTasks.filter((task) => task.startsWith('^'));
	deleted = utils.removeTaskIdentifier(deleted);
	const doneHashMap = createCountHashMap(done);
	const undoneHashMap = createCountHashMap(undone);
	const deletedHashMap = createCountHashMap(deleted);
	undone = undone.map((task) => {
		const taskHash = utils.hashCode(task);
		if (!doneHashMap.has(taskHash)) { // Task may be marked DONE
			return task;
		}
		if (doneHashMap.get(task) < undoneHashMap.get(task)) { 
			return task;
		}
	});
	console.log(undone);
}
utils.getFilteredTasks = (allTasks) => {
	// Grab each type of entry and remove their identifier.
	let done = allTasks.filter((task) => task.startsWith('*'));
	done = utils.removeTaskIdentifier(done);
	let undone = allTasks.filter((task) => task.startsWith('#'));
	undone = utils.removeTaskIdentifier(undone);
	let deleted = allTasks.filter((task) => task.startsWith('^'));
	deleted = utils.removeTaskIdentifier(deleted);
	// Create a HashMap for doing Union/Intersection on arrays
	const doneHashMap = new Map();
	done.forEach((task) => {
		doneHashMap.set(utils.hashCode(task), task);
	});
	const newUndoneTasks = [];
	undone.forEach((task) => {
		const hashCode = utils.hashCode(task);
		if (!doneHashMap.has(hashCode)) {
			newUndoneTasks.push(task);
		}
	});
	const deleteMap = new Map();
	deleted.forEach((task) => deleteMap.set(utils.hashCode(task), task));
	const newDone = [];
	done.forEach((task) => {
		const hashCode = utils.hashCode(task);
		if (!deleteMap.has(hashCode)) {
			newDone.push(task);
		}
	});
	const latestUndone = [];
	newUndoneTasks.forEach((task) => {
		const hashCode = utils.hashCode(task);
		if (!deleteMap.has(hashCode)) {
			latestUndone.push(task);
		}
	});
	return {
		undone: [...utils.addTaskIdentifier(latestUndone, 'undone')],
		done: [...utils.addTaskIdentifier(newDone, 'done')]
	};
	// return [...(utils.addTaskIdentifier(latestUndone, 'undone')), ...(utils.addTaskIdentifier(newDone, 'done'))];
};
utils.removeTaskIdentifier = (tasks) => tasks.map((task) => task.split('').slice(1).join(''));
utils.addTaskIdentifier = (tasks, type) => {
	if (type === 'done') {
		return tasks.map((task) => task.padStart(task.length + 1, '*'));
	}
	if (type == 'undone') {
		return tasks.map((task) => task.padStart(task.length + 1, '#'));
	}
	if (type == 'delete') {
		return tasks.map((task) => task.padStart(task.length + 1, '^'));
	}
};
utils.hashCode = (str) => {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
utils.taskStatus = {
	PENDING: 'PENDING',
	DONE: 'DONE',
	CARRY: 'CARRY'
}
module.exports = utils;
