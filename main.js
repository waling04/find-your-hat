// Please copy and paste your GitHub Repo on line 2 (optional)
// <GitHub Repo>

// JavaScript Assessment Rubric: https://generation.instructure.com/courses/2342/assignments/143783

// Codecademy: https://www.codecademy.com/paths/front-end-engineer-career-path/tracks/fecp-javascript-syntax-part-iii/modules/fecp-challenge-project-find-your-hat/projects/find-your-hat

// Please break down your thinking process step-by-step (mandatory)
// Let's think about the rules first, if the player found the hat = win, if the player is in the hole = lose, 
// and if the player is out of the field = lose too!
// Create class Field and create Step 1 - 6 in it
// Step 1 : First, I will create a print() method to print the field and in this method will have clear() method
//          to clear the console, so the field will display just one, if not it will show every time the player moves 

// Step 2 : In this step, I decided to generate the field of the game
//      2.1 Generate the field by using a 2D array (row, column)
//      2.2 When generating the field, let's generate the hole too (use Math.random())

// Step 3 : First I want to check that the input from the player is invalid or not 
//          by creating the method isValidDirection()
//      3.1 This step will check the player's input has to be 'u', 'd', 'l', and 'r'

// Step 4 : Then let's create the method movePlayer() for players to choose which way they want to move? 
//      4.1 Check the player's input that isValidDirection() or not if not, the game is will not continue
//      4.2 I decided to let the player key 'u' for a move up, 'd' for a move down, 'l' for a move left 
//          and 'r' for move right
//      4.3 every time the player move will print() to show current position of the player

// Step 5 : Now I have a method for generating a field and a method for players to choose the way they want to move
//          This step will create the method to check if the player is win or lose
//      5.1 If the player found the hat, the player is Win! By checking this we have to compare the position of the player
//          and the position of the hat if it match.. return boolean
//      5.2 If the player is in the hole, the player is lose! By checking this we have to compare the position of the player
//          and the position of the hole, if it match.. return boolean
//      5.3 After that I have to create a method to check the field's scope

// Step 6 : I have everything I want. let's create a play() method!
//      6.1 In this method have to check if the player is win or lose by using a while loop, first have to set up that playing = true
//      6.2 second, let's check if the player found the hat (win) by using if.. else and isFoundTheHat() method that we created in 
//          step 5.1 if it's true, console.log('Congratulations! You found your hat!🎩') and end the game
//      6.3 If the player has not found the hat yet.. let's check if they fell in the hole or out of the field or else
//          by using if.. else and isInTheHole() if it's true, console.log('Ugh.. You fell in the hole!') and end the game
//      6.4 If the player still has not found the hat and not fell in the hole too.. Check if they're not out of the field
//          by using if.. else and !isInTheField() if it's true, console.log('You are out of the field!') and end the game

// JS Assessment: Find your hat //
const prompt = require('prompt-sync')({ sigint: true }); // This sends a SIGINT, or “signal interrupt” message indicating that a user wants to exit a program by press Crtl+c
const clear = require('clear-screen');//every turn clear the screen that meant you will not get new field in time you choose the direction
const hat = '🎩';
const hole = 'O';
const fieldCharacter = '▓';//'░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    // Set the "home" position before the game starts
    this.field[0][0] = pathCharacter;
  }

  // Step 1 create a print() method to print the field
  //print field method to make it easier 
  print() {
    // clear the console, so the field will display just one time
    //clear();
    console.clear();
    // your print map code here
    const printField = this.field.map((row) => row.join(' ')).join('\n');
    console.log(printField);
  }

  //the rest of your code starts here.
  // Step 2 generate the field 
  // This method doesn’t need to be tied to a particular instance, so we can make it a static method of the class itself.
  static generateField(row, column) {
    // create an array for row
    let field = new Array(row);
    let holeChance = 0.2;
    for (let i = 0; i < field.length; i++) {
      // create an array for column
      field[i] = new Array(column);
    }
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        //check if this is not a start point or near a start point
        if (
          (i !== 0 || j !== 0) &&
          (i !== 1 || j !== 0) &&
          (i !== 0 || j !== 1)
        ) {
          //create the field space that is not the hole
          const notHole = Math.random();
          if (notHole > holeChance) {
            field[i][j] = fieldCharacter;
            //if it's not the plain space set it to the hole
          } else field[i][j] = hole;
        } else field[i][j] = fieldCharacter;
      }
    }
    // set the hat position by using Math.random() 
    const hatPositionX = Math.floor(Math.random() * row);
    const hatPositionY = Math.floor(Math.random() * column);
    field[hatPositionY][hatPositionX] = hat;
    return field;
  }

  // Step 3 to check that the input from the player is invalid or not
  isValidDirection(direction) {
    return ['u', 'd', 'l', 'r'].includes(direction);
  }

  // Step 4 create the method for players to choose direction
  movePlayer() {
    // show direction
    console.log('u=up, d=down, l=left, r=right');
    // ask the player to input the direction that they want
    const direction = prompt(
      'Which way do you want to move? -->').toLowerCase();
    // check if the player's input is invalid or not
    if (!this.isValidDirection(direction)) {
      return;
    }
    // set the direction 'u' for up, 'd' for down, 'l' for left, and 'r' for right
    switch (direction) {
      case 'u':
        this.positionY -= 1;
        break;
      case 'd':
        this.positionY += 1;
        break;
      case 'l':
        this.positionX -= 1;
        break;
      case 'r':
        this.positionX += 1;
        break;
      default:
        break;
    }
    // every time the player move will print() to show current position of the player
    this.print();
  }

  // Step 5 set the rules methods
  // Step 5.1 check the position of the player and the hat
  isFoundTheHat() {
    return this.field[this.positionY][this.positionX] === hat;
  }

  // Step 5.2 check the position of the player and the hole
  isInTheHole() {
    return this.field[this.positionY][this.positionX] === hole;
  }

  // Step 5.3 check the field's scope
  isInTheField() {
    return (
      this.positionX >= 0 &&
      this.positionY >= 0 &&
      this.positionX < this.field[0].length &&
      this.positionY < this.field.length
    );
  }

  // Step 6 create method to check if the player is win or lose
  play() {
    // Step 6.1 set playing = true;
    let playing = true;
    while (playing) {
      // call movePlayer() method
      this.movePlayer();
      // Step 6.2 check if the player is win and found the hat
      if (this.isFoundTheHat()) {
        console.log('Congratulations! You found your hat!🎩');
        playing = false; // if win, end game
        return;
      }

      // Step 6.3 check if the player is lose and fell in the hole
      if (this.isInTheHole()) {
        console.log('Ugh.. You fell in the hole!');
        playing = false; // if lose, end game
        return;
      }

      // Step 6.4 check if the player is out of the field's scope
      if (!this.isInTheField()) {
        console.log('You are out of the field!');
        playing = false; // if lose, end game
        return;
      }
      // show current position of the player
      this.field[this.positionY][this.positionX] = pathCharacter;
      this.print();
    }
  }
}

const newField = new Field(Field.generateField(10, 10));
newField.print();
newField.play();

// const prompt = require("prompt-sync")({ sigint: true });

// const hat = "🎩";
// const hole = "O";
// const fieldCharacter = "░";
// const pathCharacter = "*";

// class Field {
//   constructor(field = [[]]) {
//     this.field = field;
//     this.positionX = 0;
//     this.positionY = 0;
//     // Set the "home" position before the game starts
//     this.field[0][0] = pathCharacter;
//   }

//   //print field method to make it easier
//   print() {
//     console.clear();
//     // your print map code here
//     const printField = this.field.map((row) => row.join(" ")).join("\n");
//     console.log(printField);
//   }

//   // the rest of your code starts here.
//   static generateField(height, width) {
//     let field = new Array(height);
//     let holeChance = 0.2;
//     for (let i = 0; i < field.length; i++) {
//       field[i] = new Array(width);
//     }
//     for (let i = 0; i < field.length; i++) {
//       for (let j = 0; j < field[i].length; j++) {
//         //check if this is not a started point or near a started point
//         if (
//           (i !== 0 || j !== 0) &&
//           (i !== 1 || j !== 0) &&
//           (i !== 0 || j !== 1)
//         ) {
//           const notHole = Math.random();
//           if (notHole > holeChance) {
//             field[i][j] = fieldCharacter;
//           } else field[i][j] = hole;
//         } else field[i][j] = fieldCharacter;
//       }
//     }
//     const hatPositionX = Math.floor(Math.random() * width);
//     const hatPositionY = Math.floor(Math.random() * height);
//     field[hatPositionY][hatPositionX] = hat;

//     //       const startPositionX = Math.floor(Math.random() * width);
//     // const startPositionY = Math.floor(Math.random() * height);
//     // field[startPositionY][startPositionX] = pathCharacter;
//     return field;
//   }

//   isValidDirection(direction) {
//     return ["u", "d", "l", "r"].includes(direction);
//   }

//   movePlayer() {
//     const direction = prompt(
//       "Which way do you want to move? -->"
//     ).toLowerCase();
//     if (!this.isValidDirection(direction)) {
//       return;
//     }
//     switch (direction) {
//       case "u":
//         this.positionY -= 1;
//         break;
//       case "d":
//         this.positionY += 1;
//         break;
//       case "l":
//         this.positionX -= 1;
//         break;
//       case "r":
//         this.positionX += 1;
//         break;
//       default:
//         break;
//     }
//     this.print();
//   }

//   isFoundTheHat() {
//     return this.field[this.positionY][this.positionX] === hat;
//   }

//   isInTheHole() {
//     return this.field[this.positionY][this.positionX] === hole;
//   }

//   isInTheField() {
//     return (
//       this.positionX >= 0 &&
//       this.positionY >= 0 &&
//       this.positionX < this.field[0].length &&
//       this.positionY < this.field.length
//     );
//   }

//   play() {
//     let playing = true;
//     while (playing) {
//       this.movePlayer();

//       if (this.isFoundTheHat()) {
//         console.log('Congratulations! You found your hat!🎩');
//         playing = false;
//         return;
//       }

//       if (this.isInTheHole()) {
//         console.log('Ugh.. You fell in the hole!');
//         playing = false;
//         return;
//       }

//       if (!this.isInTheField()) {
//         console.log('You are out of the field!');
//         playing = false;
//         return;
//       }
//       this.field[this.positionY][this.positionX] = pathCharacter;
//       this.print();
//     }
//   }
// }
// const newField = new Field(Field.generateField(10, 10));
// newField.play();
