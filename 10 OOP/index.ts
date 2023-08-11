#!/usr/bin/env node
import  inquirer from 'inquirer';

class Person {
    protected personality: string;

    constructor() {
        this.personality = "Mystery";
    }

    askQuestion(answer: number): void {
        if (answer === 1)
            this.personality = "Extrovert";
        else
            this.personality = "Introvert";
    }

    getPersonality(): string {
        return this.personality;
    }
}

class Student extends Person {
    private name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class Program {
    static async main(): Promise<void> {
        const answers = await inquirer.prompt([
            {
                type: 'number',
                name: 'answer',
                message: "Type 1 if you like to talk to others, or type 2 if you'd rather be by yourself:",
            },
            {
                type: 'input',
                name: 'name',
                message: "What is your name?",
            }
        ]);

        const answer = answers.answer;
        const name = answers.name;

        const myStudent = new Student(name);
        myStudent.askQuestion(answer);

        console.log(`Your name is ${myStudent.getName()} and your personality is ${myStudent.getPersonality()}`);
    }
}

Program.main();
