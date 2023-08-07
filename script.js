// global variables
let level = 1;
let score = 0;
let fieldId;
let fieldValue;
let drawnNumbers = [];
let scorecardGridArr = [];
let winningPatternsInGame = [];

// helper functions

// get id for fields
const getFieldId = e => {
  fieldId = e.target.id;
};

// get value for fields -> where is this used?
const getFieldValue = e => {
  fieldValue = Number(e.target.textContent);
};

// create random number
const randomNumber = level => {
  let range = level * 10;
  let randomNumber = Math.floor(Math.random() * range + 1);
  return randomNumber;
};

// reset winning patterns array
const clearWinningPatterns = function () {
  winningPatternsInGame.length = 0;
  winningPatternsInGame = [
    [
      'scorecardfield_1-1',
      'scorecardfield_1-2',
      'scorecardfield_1-3',
      'scorecardfield_1-4',
      'scorecardfield_1-5',
      50,
    ],
    [
      'scorecardfield_2-1',
      'scorecardfield_2-2',
      'scorecardfield_2-3',
      'scorecardfield_2-4',
      'scorecardfield_2-5',
      50,
    ],
    [
      'scorecardfield_3-1',
      'scorecardfield_3-2',
      'scorecardfield_3-3',
      'scorecardfield_3-4',
      'scorecardfield_3-5',
      75,
    ],
    [
      'scorecardfield_4-1',
      'scorecardfield_4-2',
      'scorecardfield_4-3',
      'scorecardfield_4-4',
      'scorecardfield_4-5',
      50,
    ],
    [
      'scorecardfield_5-1',
      'scorecardfield_5-2',
      'scorecardfield_5-3',
      'scorecardfield_5-4',
      'scorecardfield_5-5',
      50,
    ],
    [
      'scorecardfield_1-1',
      'scorecardfield_2-1',
      'scorecardfield_3-1',
      'scorecardfield_4-1',
      'scorecardfield_5-1',
      50,
    ],
    [
      'scorecardfield_1-2',
      'scorecardfield_2-2',
      'scorecardfield_3-2',
      'scorecardfield_4-2',
      'scorecardfield_5-2',
      50,
    ],
    [
      'scorecardfield_1-3',
      'scorecardfield_2-3',
      'scorecardfield_3-3',
      'scorecardfield_4-3',
      'scorecardfield_5-3',
      75,
    ],
    [
      'scorecardfield_1-4',
      'scorecardfield_2-4',
      'scorecardfield_3-4',
      'scorecardfield_4-4',
      'scorecardfield_5-4',
      50,
    ],
    [
      'scorecardfield_1-5',
      'scorecardfield_2-5',
      'scorecardfield_3-5',
      'scorecardfield_4-5',
      'scorecardfield_5-5',
      50,
    ],
    [
      'scorecardfield_1-1',
      'scorecardfield_2-2',
      'scorecardfield_3-3',
      'scorecardfield_4-4',
      'scorecardfield_5-5',
      75,
    ],
    [
      'scorecardfield_5-1',
      'scorecardfield_4-2',
      'scorecardfield_3-3',
      'scorecardfield_2-4',
      'scorecardfield_1-5',
      75,
    ],
  ];
};

// const equalizeArrays = function () {
//   for (let i = 0; i < winningPatterns.length; i++) {
//     winningPatternsInGame.length = 0;
//     winningPatternsInGame.push(winningPatterns[i]);
//   }
// };

// building game interface
// building scorecard grid
const buildScorecardGrid = function () {
  // gradually add fields to div with id numgrid
  let numgrid = document.getElementById('scorecardgrid'); // get div into code
  numgrid.innerHTML = '';
  for (let i = 1; i < 6; i++) {
    let newRow;
    newRow = document.createElement('div');
    newRow.setAttribute('id', `row${i}`);
    newRow.setAttribute('class', 'numrow');
    numgrid.append(newRow);
    for (let j = 1; j < 6; j++) {
      let newField;
      newField = document.createElement('div'); // create new element
      newField.setAttribute('id', `scorecardfield_${i}-${j}`);
      newField.setAttribute('class', 'scorecardfield');
      newRow.append(newField); // add new element to div
    }
  }
  const scorecardField = document.getElementsByClassName('scorecardfield');
  for (let field of scorecardField) {
    // assign events to every field
    field.addEventListener('click', getFieldId);
    field.addEventListener('click', getFieldValue);
    field.addEventListener('click', checkNumber);
  }
};

const assignScorecardNumbers = function (level) {
  for (let i = 1; i < 6; i++) {
    // this is not the best solution -> should be more dynamic
    for (let j = 1; j < 6; j++) {
      // create object
      let scorecardGridObj = {};
      scorecardGridObj.id = 'scorecardfield_' + i + '-' + j;
      scorecardGridObj.value = randomNumber(level);
      scorecardGridObj.matched = false;
      // assign value to grid
      scorecardGridObj.addToGrid = function () {
        document.getElementById(this.id).innerHTML = this.value;
      };
      scorecardGridObj.addToGrid();
      // add object to array
      scorecardGridArr.push(scorecardGridObj);
    }
  }
};

// build grid with drawn numbers
const buildDrawnNumbersFields = function () {
  let drawnNumbersFields = document.getElementById('drawnNumbers');
  drawnNumbersFields.innerHTML = '';
  for (let i = 1; i < 6; i++) {
    let newField;
    //create element
    newField = document.createElement('div');
    // set attributes
    newField.setAttribute('id', `drawnfield_${i}`);
    newField.setAttribute('class', 'drawnfield');
    // append parent element
    drawnNumbersFields.append(newField);
    // testing here //
  }
};

// assign numbers to drawnNumbers
const assignDrawnNumbers = function (level) {
  // repeat 5 times for amount of drawn numbers -> this is not the best solution
  let alreadyDrawnNumbers = [];
  drawnNumbers = [];
  for (let i = 1; i < 6; i++) {
    let drawnNumberObj = {};
    let newNumber = randomNumber(level);
    // avoid duplicates in drawnNumber
    while (alreadyDrawnNumbers.includes(newNumber)) {
      newNumber = randomNumber(level);
    }
    alreadyDrawnNumbers.push(newNumber);
    drawnNumberObj.id = 'drawnfield_' + i;
    drawnNumberObj.value = newNumber;
    drawnNumberObj.addToFields = function () {
      document.getElementById(this.id).innerHTML = this.value;
    };
    drawnNumberObj.addToFields();
    drawnNumbers.push(drawnNumberObj);
  }
  console.log(drawnNumbers.length);
};

// checking results

const checkNumber = function () {
  console.log(fieldValue);
  let i = 0;
  while (i < drawnNumbers.length) {
    if (fieldValue === drawnNumbers[i].value) {
      console.log('found!');
      showMatchCircle();
      updateMatchPatterns(fieldId);
      checkMatchPatterns();
    }
    i++;
  }
};

// add new numbers

const drawNewNumbers = function () {
  buildDrawnNumbersFields();
  assignDrawnNumbers(level);
  score -= 10;
};

// new game

const newGame = function () {
  clearWinningPatterns();
  // console.log(winningPatterns);
  console.log(winningPatternsInGame);
  // winningPatternsInGame = winningPatterns;
  // equalizeArrays();
  score = 0;
  level = 1;
  buildScorecardGrid();
  assignScorecardNumbers(1);
  buildDrawnNumbersFields();
  assignDrawnNumbers(1);
  console.log(winningPatternsInGame);
};

const nextLevel = function (level) {};

document.onload = clearWinningPatterns();
document.onload = buildScorecardGrid();
document.onload = assignScorecardNumbers(1);
document.onload = buildDrawnNumbersFields();
document.onload = assignDrawnNumbers(1);

const showMatchCircle = function () {
  let matchCircle;
  let getField = document.getElementById(fieldId);
  matchCircle = document.createElement('span');
  matchCircle.setAttribute('class', 'match_circle');
  getField.append(matchCircle);
};

const deleteMatchCircles = function () {
  let matchCircles;
  matchCircles = Array.from(document.getElementsByClassName('match_circle'));
  matchCircles.forEach(element => {
    element.remove();
  });

  //getElementsByClassName creates an array that isn't an array (HTMLCollection)
};

// add everything down here :)

// update match pattern
const updateMatchPatterns = function (matchedField) {
  //loop through
  for (let i = 0; i < winningPatternsInGame.length; i++) {
    if (winningPatternsInGame[i].indexOf(matchedField) != -1) {
      winningPatternsInGame[i].splice(
        winningPatternsInGame[i].indexOf(matchedField),
        1
      );
    }
  }
};

const checkMatchPatterns = function () {
  for (let i = 0; i < winningPatternsInGame.length; i++) {
    if (winningPatternsInGame[i].length === 1) {
      // gameWon();
      console.log('You won!');
      break;
    }
  }
};
