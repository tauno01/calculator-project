let totalValue = '';

function add(num1, num2) {
    totalValue = num1 + num2;
    return totalValue;
}

function substract(num1, num2) {
    totalValue = num1 - num2;
    return totalValue;
}

function multiply(num1, num2) {
    totalValue = num1 * num2;
    return totalValue;
}

function divide(num1, num2) {
    totalValue = num1 / num2;
    return totalValue;
}


/* This function first turns the arrays into strings so it can
then do the correct calculation for user inputs. Then whatever
operator user has pressed, the corresponding calculation function
is called (the functions are above this text) */


function operate(firstNum, operator, secondNum) {

    const firstNumStr = firstNum.toString().replaceAll(',', '');
    const secondNumStr = secondNum.toString().replaceAll(',', '');
    const operatorStr = operator.toString().replaceAll(',', '');

    if (operatorStr.includes('+')) {
        return add(+firstNumStr, +secondNumStr)
    } else if (operator.includes('-')) {
        return substract(+firstNumStr, +secondNumStr)
    } else if (operator.includes('*')) {
        return multiply(+firstNumStr, +secondNumStr)
    } else if (operator.includes('/')) {
        return divide(+firstNumStr, +secondNumStr);
    }

}


// DIV ELEMENT CREATION AND APPENDING

const body = document.querySelector('body');
const calcContainer = document.createElement('div');
calcContainer.classList.add('calc-container');

body.appendChild(calcContainer);


const displayContainer = document.createElement('div');
displayContainer.classList.add('display-container');
calcContainer.appendChild(displayContainer);

const displayPartOne = document.createElement('div');
displayPartOne.classList.add('display-one');
const displayPartTwo = document.createElement('div');
displayPartTwo.classList.add('display-two');
const displayPartThree = document.createElement('div');
displayPartThree.classList.add('display-three');

displayContainer.appendChild(displayPartOne);
displayContainer.appendChild(displayPartTwo);
displayContainer.appendChild(displayPartThree);

const calcNumberContainer = document.createElement('div');
calcNumberContainer.classList.add('number-container');
calcContainer.appendChild(calcNumberContainer);

const equalContainer = document.createElement('div');
equalContainer.classList.add('equal-container');
calcContainer.appendChild(equalContainer);


// I use this array to put operators in the calculator buttons

const dumArray = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '.', 'AC', '/'];

/* Creating 16 children 'div' elements for container, 
these are the calculator buttons */


for (let i = 0; i <= 15; i++) {
    const containerCell = document.createElement('div');
    containerCell.classList.add('div-cell');
    containerCell.setAttribute('id', `cell-${i}`);
    calcNumberContainer.appendChild(containerCell);

    containerCell.textContent = dumArray[0];
    dumArray.shift();

}

equalContainer.textContent = '=';


// Declaring global variables for the next function

let userInputOne = [];
let userInputTwo = [];
let userOperatorValue = [];
let calcNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.'];
let calcOperators = ['+', '-', '*', '/'];

/* Event function to see what button user has pressed, and then storing
the event target 'textContent' information in an array, that is used
for the 'operate()' function */

function numberToScreen(event) {   


    if (event.target.classList.contains('div-cell') || event.target.textContent.includes('=')) {


        if (event.target.textContent.includes('AC')) {
            clear();
            displayPartTwo.textContent = '';
        }

        if (userOperatorValue.length - 1 >= 0) {

            if (displayPartThree.textContent.includes('.') && event.target.textContent.includes('.')) {
                for (let i = 0; i <= 9; i++) {
                    if (event.target.textContent.includes(calcNumbers[i])) {
                        displayPartThree.textContent += event.target.textContent;
                        userInputTwo.push(event.target.textContent);
                    }
                }

            } else {               
                for (let i = 0; i <= 10; i++) {
                    if (event.target.textContent.includes(calcNumbers[i])) {
                        displayPartThree.textContent += event.target.textContent;
                        userInputTwo.push(event.target.textContent);
                    }
                }
            }

        }

        if (userInputTwo.length - 1 < 0) {

            if (displayPartOne.textContent.includes('.') && event.target.textContent.includes('.')) {
                for (let i = 0; i <= 9; i++) {
                    displayPartTwo.textContent = '';
                    if (event.target.textContent.includes(calcNumbers[i])) {
                        displayPartOne.textContent += event.target.textContent;
                        userInputOne.push(event.target.textContent);
                    }
                }

            } else {                 
                for (let i = 0; i <= 10; i++) {
                    displayPartTwo.textContent = '';
                    if (event.target.textContent.includes(calcNumbers[i])) {
                        displayPartOne.textContent += event.target.textContent;
                        userInputOne.push(event.target.textContent);
                    }
                }
            }

        }

        for (let i = 0; i <= 3; i++) {
            if (event.target.textContent.includes(calcOperators[i]) && userOperatorValue.length > 0) {
                totalValue = +operate(userInputOne, userOperatorValue, userInputTwo);
                userInputTwo = [];
                userOperatorValue = [];
                displayPartTwo.textContent = event.target.textContent;
                userOperatorValue.push(event.target.textContent);
                userInputOne = [];
                userInputOne.push(totalValue);
                displayPartOne.textContent = Math.round(totalValue * 100) / 100;
                displayPartThree.textContent = '';
            }
        }

        for (let i = 0; i <= 3; i++) {
            if (event.target.textContent.includes(calcOperators[i]) && userOperatorValue <= 0) {
                displayPartTwo.textContent = event.target.textContent;
                userOperatorValue.push(event.target.textContent);
            }
        }

        if (event.target.textContent.includes('=')) {
            operate(userInputOne, userOperatorValue, userInputTwo);
            displayPartOne.textContent = '';
            displayPartThree.textContent = '';
            
                if(userOperatorValue.includes('/') && userInputTwo.includes('0')) {
                    displayPartTwo.textContent = `That's a lot bro`;
                } else {
                    displayPartTwo.textContent = Math.round(totalValue * 100) / 100;
                }

            clear();
        }

    }


}

// Function that clears ALL data and starts fresh

function clear() {
    displayPartOne.textContent = '';
    displayPartThree.textContent = '';
    userInputOne = [];
    userInputTwo = [];
    userOperatorValue = [];
    totalValue = '';
}


calcNumberContainer.addEventListener('click', numberToScreen);
equalContainer.addEventListener('click', numberToScreen);