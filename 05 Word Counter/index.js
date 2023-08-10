#!/usr/bin/env node
import inquirer from 'inquirer';
async function main() {
    const response = await inquirer.prompt([
        {
            type: 'input',
            name: 'paragraph',
            message: 'Enter a paragraph:',
        },
    ]);
    const paragraph = response.paragraph;
    // Count characters (excluding whitespaces)
    const characterCount = paragraph.replace(/\s/g, '').length;
    // Count words (splitting by whitespaces)
    const words = paragraph.split(/\s+/);
    const wordCount = words.length;
    console.log(`Character count (excluding whitespaces): ${characterCount}`);
    console.log(`Word count: ${wordCount}`);
}
main();
