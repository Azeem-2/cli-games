#!/usr/bin/env node

import inquirer from 'inquirer';

const countdownTimer = async () => {
  console.log("Welcome to the Countdown Timer!\n");

  const targetDateResponse = await inquirer.prompt([
    {
      type: 'input',
      name: 'targetDateTime',
      message: 'Enter the target date and time (YYYY-MM-DD HH:MM:SS):'
    }
  ]);

  const targetDateTime = new Date(targetDateResponse.targetDateTime);
  
  if (isNaN(targetDateTime.getTime())) {
    console.log("Invalid date and time format. Please use the format YYYY-MM-DD HH:MM:SS.");
    return;
  }

  const interval = setInterval(() => {
    const currentDateTime = new Date();
    const remainingTime = targetDateTime.getTime() - currentDateTime.getTime();

    if (remainingTime <= 0) {
      clearInterval(interval);
      console.log("\nCountdown has ended! Time's up!");
      return;
    }

    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    console.log(`Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`);
  }, 1000);
};

countdownTimer();
