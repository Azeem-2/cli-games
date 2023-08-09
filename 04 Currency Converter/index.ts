#!/usr/bin/env node

import inquirer from 'inquirer';
import { CurrencyConverter } from './currency-converter.js';



const rates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110,
    PKR: 170.5
};

const converter = new CurrencyConverter(rates);

inquirer
    .prompt([
        {
            type: 'input',
            name: 'amount',
            message: 'Enter the amount of money you want to convert:',
            validate: (input) => {
                const parsedInput = parseFloat(input);
                if (isNaN(parsedInput)) {
                    return 'Please enter a valid number';
                }
                return true;
            }
        },
        {
            type: 'list',
            name: 'fromCurrency',
            message: 'Select the source currency:',
            choices: Object.keys(rates)
        }
    ])
    .then(answers => {
        const amount = parseFloat(answers.amount);
        const fromCurrency = answers.fromCurrency;
        const toCurrency = 'PKR';

        const convertedAmount = converter.convert(amount, fromCurrency, toCurrency);

        console.log(`${amount} ${fromCurrency} is equal to ${convertedAmount} ${toCurrency}`);
    });
