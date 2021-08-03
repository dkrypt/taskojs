const inquirer = require('inquirer');

const prompt = {};

prompt.done = (choices) => {
    return new Promise((resolve, reject) => {
        choices = choices.map((choice) => choice.task);
        inquirer.prompt([
            {
                type: 'list',
                loop: true,
                name: 'done-task',
                message: 'Choose the task to mark as DONE.',
                choices
            }
        ])
        .then((answers) => {
           resolve(answers['done-task']);
        })
        .catch(error => reject(error));       
    });
};  

prompt.delete = (choices) => {
    return new Promise((resolve, reject) => {
        choices = choices.map((choice) => choice.task);
        inquirer.prompt([
            {
                type: 'list',
                loop: true,
                name: 'delete-task',
                message: 'Choose the task to DELETE',
                choices
            }
        ])
        .then((answers) => {
           resolve(answers['delete-task']);
        })
        .catch(error => reject(error));       
    });
};
module.exports = prompt;
