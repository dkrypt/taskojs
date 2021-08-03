const parser = {};
const { run } = require('./command-runner');
const { showHelp } = require('./utils');

const commands = {
	add: 'add',
	a: 'add',
	done: 'done',
	d: 'done',
	list: 'list',
	l: 'list',
	export: 'export',
	e: 'export',
	delete: 'delete',
	del: 'delete',
	help: 'help',
	h: 'help',
	version: 'version',
	v: 'version'
}

parser.parse = async (args) => {
	if (!args || args.length === 0) {
		console.log('  [ERROR] - No arguments provided.');
		showHelp();	
	}
	const rawCommand = args[0];
	const validCommand = commands.hasOwnProperty(rawCommand);
	let command = null;
	if (validCommand) {
		command = commands[rawCommand];
	}
	await run(command, args.slice(1));
};

module.exports = parser;
