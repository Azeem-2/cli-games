#!/usr/bin/env node
import inquirer from 'inquirer';

class Customer {
  private firstName: string;
  private lastName: string;
  private gender: string;
  private age: number;
  private mobileNumber: string;
  private balance: number;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: string,
    initialBalance: number
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.balance = initialBalance;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  checkBalance(): number {
    return this.balance;
  }

  debit(amount: number): string {
    if (this.balance < amount) {
      return "Insufficient balance. Transaction canceled.";
    }

    this.balance -= amount;
    return `Debited $${amount}. New balance: $${this.balance}`;
  }

  credit(amount: number): string {
    if (amount > 100) {
      this.balance += amount - 1;
      return `Credited $${amount}. $1 deducted for transaction fee. New balance: $${this.balance}`;
    }

    this.balance += amount;
    return `Credited $${amount}. New balance: $${this.balance}`;
  }
}

async function main() {
  const accountInfo = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: "Enter your first name:"
    },
    {
      type: 'input',
      name: 'lastName',
      message: "Enter your last name:"
    },
    {
      type: 'input',
      name: 'gender',
      message: "Enter your gender:"
    },
    {
      type: 'number',
      name: 'age',
      message: "Enter your age:"
    },
    {
      type: 'input',
      name: 'mobileNumber',
      message: "Enter your mobile number:"
    },
    {
      type: 'number',
      name: 'initialBalance',
      message: "Enter your initial account balance:"
    }
  ]);

  const customer = new Customer(
    accountInfo.firstName,
    accountInfo.lastName,
    accountInfo.gender,
    accountInfo.age,
    accountInfo.mobileNumber,
    accountInfo.initialBalance
  );

  console.log(`Welcome, ${customer.getFullName()}!`);
  console.log(`Your initial balance: $${customer.checkBalance()}`);

  const transactionChoice = await inquirer.prompt([
    {
      type: 'list',
      name: 'transaction',
      message: 'Choose a transaction:',
      choices: ['Check Balance', 'Debit', 'Credit']
    }
  ]);

  if (transactionChoice.transaction === 'Check Balance') {
    console.log(`Your current balance: $${customer.checkBalance()}`);
  } else if (transactionChoice.transaction === 'Debit') {
    const debitAmount = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'Enter the debit amount:'
      }
    ]);
    console.log(customer.debit(debitAmount.amount));
  } else if (transactionChoice.transaction === 'Credit') {
    const creditAmount = await inquirer.prompt([
      {
        type: 'number',
        name: 'amount',
        message: 'Enter the credit amount:'
      }
    ]);
    console.log(customer.credit(creditAmount.amount));
  }
}

main();

