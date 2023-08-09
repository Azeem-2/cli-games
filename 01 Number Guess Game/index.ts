#!/usr/bin/env node
import inquirer from "inquirer";

const MAX_GUESSES = 10;
const generateRandomNumber = ()=> Math.floor(Math.random() * 100);

const runGame = async ()=>{
  const randomNumber = generateRandomNumber();
  let guessesLeft = MAX_GUESSES;
  while(guessesLeft > 0){
    const question = inquirer.prompt({
      type:"input",
      name:"guess",
      message:"Guess a number between 1 and 100: ",
    })
    const guess = parseInt((await question).guess);

    if(guess === randomNumber){
      console.log(`You gusssed the correct number number was ${randomNumber} `)
      break;
    }else if(guess<randomNumber){
      console.log("Your guess is too low")
    }else{
      console.log("Your guess is too high")

    }
    guessesLeft--;
    
  }
  if(guessesLeft === 0){
    console.log(`You ran out of guesses. The correct number was ${randomNumber}`)

  }
}
runGame()