#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
const students = [];
async function main() {
    console.log(chalk.green('Student Management System'));
    while (true) {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Student', 'Enroll in Course', 'View Balance', 'Pay Tuition', 'Show Status', 'Exit'],
        });
        if (action === 'Add Student') {
            const studentName = await inquirer.prompt({
                type: 'input',
                name: 'name',
                message: 'Enter student name:',
            });
            const student = {
                id: generateStudentID(),
                name: studentName.name,
                courses: [],
                balance: 0,
            };
            students.push(student);
            console.log(chalk.blue(`Student ${student.name} added with ID: ${student.id}`));
        }
        else if (action === 'Enroll in Course') {
            // Implement course enrollment logic
        }
        else if (action === 'View Balance') {
            // Implement view balance logic
        }
        else if (action === 'Pay Tuition') {
            // Implement pay tuition logic
        }
        else if (action === 'Show Status') {
            // Implement show status logic
        }
        else if (action === 'Exit') {
            console.log(chalk.yellow('Exiting Student Management System.'));
            break;
        }
    }
}
function generateStudentID() {
    const randomID = Math.floor(Math.random() * 90000) + 10000;
    return `STU${randomID}`;
}
main();
