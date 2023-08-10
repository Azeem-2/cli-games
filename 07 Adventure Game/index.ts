#!/usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import randomItem from 'random-item';

// Game configuration
const enemies = ['skeleton', 'zombie', 'warrior', 'assassin'];
const maxEnemyHealth = 75;
const enemyAttackDamage = 25;
const playerHealth = 100;
const playerAttackDamage = 50;
const numHealthPotions = 3;
const healthPotionHealAmount = 30;
const healthPotionDropChance = 0.5; // 50% drop chance
const levelUpThreshold = enemies.length; // Level up after defeating all enemies
const maxPlayerLives = 3;

let player: any;
let currentEnemy: any;
let playerLevel = 1;
let playerLives = maxPlayerLives;

const mainMenu = async () => {
  console.log(chalk.yellow("Welcome to the Dungeon!\n"));

  player = {
    health: playerHealth,
    attackDamage: playerAttackDamage,
    healthPotions: numHealthPotions,
  };

  while (playerLives > 0 && playerLevel <= levelUpThreshold) {
    currentEnemy = getRandomEnemy();
    console.log(chalk.red(`Player Level: ${playerLevel}`));
    console.log(`Player Lives: ${playerLives}`);
    console.log(formatHealthBar(player.health, playerHealth, "Player"));
    console.log(formatHealthBar(currentEnemy.health, maxEnemyHealth, `Enemy: ${currentEnemy.name}`));

    const action = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['Attack', 'Drink Health Potion', 'Run']
      }
    ]);

    switch (action.action) {
      case 'Attack':
        attack();
        enemyAttack();
        break;
      case 'Drink Health Potion':
        drinkHealthPotion();
        enemyAttack();
        break;
      case 'Run':
        run();
        enemyAttack();
        break;
    }

    console.log(formatHealthBar(player.health, playerHealth, "Player"));
    console.log(formatHealthBar(currentEnemy.health, maxEnemyHealth, `Enemy: ${currentEnemy.name}`));
  }

  if (playerLives <= 0) {
    console.log(chalk.red("Out of lives! Game Over!"));
  } else {
    console.log(chalk.green("Congratulations! You defeated all enemies."));
  }

  const continuePlaying = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'continue',
      message: 'Do you want to play again?',
      default: false
    }
  ]);

  if (continuePlaying.continue) {
    playerLevel = 1;
    playerLives = maxPlayerLives;
    mainMenu();
  } else {
    console.log(chalk.blue("Thanks for playing!"));
  }
};

const getRandomEnemy = () => {
  const enemy = randomItem(enemies);
  return {
    name: enemy,
    health: maxEnemyHealth
  };
};

const formatHealthBar = (current: number, max: number, label: string) => {
  const percentage = (current / max) * 100;
  const filledBlocks = Math.floor(percentage / 10);
  const emptyBlocks = 10 - filledBlocks;

  const healthBar = `${label}: ${chalk.green("█".repeat(filledBlocks))}${chalk.grey("░".repeat(emptyBlocks))} (${current}/${max})`;
  return healthBar;
};

const attack = () => {
  const playerDamage = player.attackDamage;

  currentEnemy.health -= playerDamage;

  if (currentEnemy.health <= 0) {
    currentEnemy.health = 0;
    playerLevel++;
    console.log(`You defeat the ${currentEnemy.name} and level up!`);
    if (playerLevel <= levelUpThreshold) {
      console.log(`Level up! You are now level ${playerLevel}.`);
    }
  } else {
    console.log(`You attack the ${currentEnemy.name} for ${playerDamage} damage.`);
  }
};

const drinkHealthPotion = () => {
  if (player.healthPotions > 0) {
    player.health += healthPotionHealAmount;
    if (player.health > playerHealth) {
      player.health = playerHealth;
    }
    player.healthPotions--;

    console.log(`You drink a health potion and heal for ${healthPotionHealAmount} health.`);
  } else {
    console.log("You don't have any health potions left.");
  }
};

const run = () => {
  const runAwayChance = Math.random();

  if (runAwayChance > 0.5) {
    console.log("You successfully run away.");
  } else {
    const enemyDamage = enemyAttackDamage;
    player.health -= enemyDamage;
    console.log(`You try to run, but the ${currentEnemy.name} hits you for ${enemyDamage} damage.`);
  }
};

const enemyAttack = () => {
  const enemyDamage = enemyAttackDamage;
  player.health -= enemyDamage;
  console.log(`The ${currentEnemy.name} attacks you for ${enemyDamage} damage.`);
  if (player.health <= 0) {
    playerLives--;
    if (playerLives > 0) {
      console.log(chalk.red(`You lost a life! Remaining lives: ${playerLives}`));
      player.health = playerHealth;
    }
  }
};

mainMenu();
