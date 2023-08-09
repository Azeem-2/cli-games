#!/usr/bin/env node
import inquirer from 'inquirer';
function generateRandomUser() {
    const id = `user${Math.floor(Math.random() * 1000)}`;
    const pin = `${Math.floor(Math.random() * 9000) + 1000}`;
    const balance = Math.floor(Math.random() * 10000);
    return { id, pin, balance };
}
const users = Array.from({ length: 10 }, generateRandomUser);
async function main() {
    const { userId } = await inquirer.prompt([
        {
            type: 'input',
            name: 'userId',
            message: 'Enter your user ID:',
        },
    ]);
    const user = users.find((u) => u.id === userId);
    if (!user) {
        console.log('Invalid user ID');
        return;
    }
    const { pin } = await inquirer.prompt([
        {
            type: 'password',
            name: 'pin',
            message: 'Enter your PIN:',
            mask: '*',
        },
    ]);
    if (pin !== user.pin) {
        console.log('Invalid PIN');
        return;
    }
    console.log(`Welcome, ${user.id}! Your current balance is $${user.balance}.`);
}
main();
