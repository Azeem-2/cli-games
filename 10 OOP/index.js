import inquirer from 'inquirer';
class Person {
    personality;
    constructor() {
        this.personality = "Mystery";
    }
    askQuestion(answer) {
        if (answer === 1)
            this.personality = "Extrovert";
        else
            this.personality = "Introvert";
    }
    getPersonality() {
        return this.personality;
    }
}
class Student extends Person {
    name;
    constructor(name) {
        super();
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Program {
    static async main() {
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
