const os = require('os');
const fs = require('fs');
const path = require('path');

const { showWelcome } = require('../utils');

const init = {};

init.initializeStorage = async () => {
	return new Promise((resolve) => {
		const installDir = `${path.join(os.homedir(), 'taskoApp')}`;
		resolve(process.env.TASKO_INS_DIR = installDir);
		if (!fs.existsSync(installDir)) {
			showWelcome();
			console.log('\n  *#* Welcome to Tasko. A simple CLI for jotting your tasks. *#*');
			console.log('\n  * [install] You are running tasko for the first time. (Or you have deleted /home/<username>/tasko-db)');
			console.log('  * [install] Creating directory: %s', installDir);
			fs.mkdirSync(installDir, {recursive: true});
			console.log('  * [install] Successfully created directory: %s', installDir);
		}
	});
};

module.exports = {init};
