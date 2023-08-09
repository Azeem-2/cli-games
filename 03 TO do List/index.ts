#!/usr/bin/env node

import inquirer from "inquirer";

interface Task {
    title: string;
    completed: boolean;
}

const tasks: Task[] = [];

async function main() {
    while (true) {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['Add task', 'View tasks', 'Complete task', 'Exit'],
            },
        ]);

        if (action === 'Add task') {
            const { title } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'Enter the task title:',
                },
            ]);

            tasks.push({ title, completed: false });
        } else if (action === 'View tasks') {
            console.log('Tasks:');
            tasks.forEach((task, index) => {
                console.log(`${index + 1}. ${task.title} [${task.completed ? 'x' : ' '}]`);
            });
        } else if (action === 'Complete task') {
            const { index } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'index',
                    message: 'Enter the task number to complete:',
                },
            ]);

            const task = tasks[Number(index) - 1];

            if (task) {
                task.completed = true;
            } else {
                console.log('Invalid task number');
            }
        } else if (action === 'Exit') {
            break;
        }
    }
}

main();
