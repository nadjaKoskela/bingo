// global variables

let level = 1;
let score = 0;
let drawnNumbers = [];
let clickedID;
let clickedValue;

// winning patterns arrays

const winningPatterns = [
  [
    'scorecard_1-1',
    'scorecard_1-2',
    'scorecard_1-3',
    'scorecard_1-4',
    'scorecard_1-5',
    50,
  ],
  [
    'scorecard_2-1',
    'scorecard_2-2',
    'scorecard_2-3',
    'scorecard_2-4',
    'scorecard_2-5',
    50,
  ],
  [
    'scorecard_3-1',
    'scorecard_3-2',
    'scorecard_3-3',
    'scorecard_3-4',
    'scorecard_3-5',
    75,
  ],
  [
    'scorecard_4-1',
    'scorecard_4-2',
    'scorecard_4-3',
    'scorecard_4-4',
    'scorecard_4-5',
    50,
  ],
  [
    'scorecard_5-1',
    'scorecard_5-2',
    'scorecard_5-3',
    'scorecard_5-4',
    'scorecard_5-5',
    50,
  ],
  [
    'scorecard_1-1',
    'scorecard_2-1',
    'scorecard_3-1',
    'scorecard_4-1',
    'scorecard_5-1',
    50,
  ],
  [
    'scorecard_1-2',
    'scorecard_2-2',
    'scorecard_3-2',
    'scorecard_4-2',
    'scorecard_5-2',
    50,
  ],
  [
    'scorecard_1-3',
    'scorecard_2-3',
    'scorecard_3-3',
    'scorecard_4-3',
    'scorecard_5-3',
    75,
  ],
  [
    'scorecard_1-4',
    'scorecard_2-4',
    'scorecard_3-4',
    'scorecard_4-4',
    'scorecard_5-4',
    50,
  ],
  [
    'scorecard_1-5',
    'scorecard_2-5',
    'scorecard_3-5',
    'scorecard_4-5',
    'scorecard_5-5',
    50,
  ],
  [
    'scorecard_1-1',
    'scorecard_2-2',
    'scorecard_3-3',
    'scorecard_4-4',
    'scorecard_5-5',
    75,
  ],
  [
    'scorecard_5-1',
    'scorecard_4-2',
    'scorecard_3-3',
    'scorecard_2-4',
    'scorecard_1-5',
    75,
  ],
];

let winningPatternsInGame = [...winningPatterns];

// helper functions

const randomNumber = function (level) {
  return Math.floor(Math.random() * (level * 10) + 1);
};

const getClickedID = e => {
  clickedID = e.target.id;
};

const getClickedValue = e => {
  clickedValue = Number(e.target.textContent);
};

// UI responses

const addMatchedCircle = function () {
  let field = document.getElementById(clickedID);
  let circle;
  circle = document.createElement('span');
  circle.setAttribute('class', 'matched_circle');
  field.append(circle);
};

// check numbers on click
const checkWinningPatterns = function () {
  for (let i = 0; i < winningPatternsInGame.length; i++) {
    if (winningPatterns[i].length === 1) {
      console.log('Won!');
    }
  }
};

const updateWinningPatterns = function () {
  for (let i = 0; i < winningPatternsInGame.length; i++) {
    if (winningPatternsInGame[i].indexOf(clickedID) != -1) {
      winningPatternsInGame[i].splice(
        winningPatternsInGame[i].indexOf(clickedID),
        1
      );
    }
  }
};

const checkNumber = function () {
  if (drawnNumbers.includes(clickedValue)) {
    addMatchedCircle();
    updateWinningPatterns();
    checkWinningPatterns();
  }
};

// set up game field

// set up grids
const setUpGrid = function (gridType) {
  let rows;
  let idprefix;
  let grid;
  if (gridType === 'drawn') {
    rows = 1;
    idprefix = 'drawn';
    grid = document.getElementById('drawnGrid');
  } else if (gridType === 'scorecard') {
    rows = 5;
    idprefix = 'scorecard';
    grid = document.getElementById('scorecardGrid');
  }
  grid.innerHTML = '';
  for (let i = 1; i < rows + 1; i++) {
    let newRow;
    newRow = document.createElement('div');
    grid.append(newRow);
    for (let j = 1; j < 6; j++) {
      let newField;
      newField = document.createElement('div');
      newField.setAttribute('id', `${idprefix}_${i}-${j}`);
      newField.setAttribute('class', `${idprefix}field`);
      newRow.append(newField);
    }
  }
  addScorecardEvents();
};

// add numbers to fields
const addDrawnNumbers = function () {
  let newNumber;
  let drawnField;
  drawnNumbers.length = 0;
  for (let i = 1; i < 6; i++) {
    newNumber = randomNumber(level);
    while (drawnNumbers.indexOf(newNumber) != -1) {
      newNumber = randomNumber(level);
    }
    drawnField = document.getElementById(`drawn_1-${i}`);
    drawnField.innerHTML = newNumber;
    drawnNumbers.push(newNumber);
  }
};

const addScorecardNumbers = function () {
  let scorecardField;
  for (let i = 1; i < 6; i++) {
    for (let j = 1; j < 6; j++) {
      scorecardField = document.getElementById(`scorecard_${i}-${j}`);
      scorecardField.innerHTML = randomNumber(level);
    }
  }
};

// add functionalities to fields
const addScorecardEvents = function () {
  let scorecardFields = document.getElementsByClassName('scorecardfield');
  for (let field of scorecardFields) {
    field.addEventListener('click', getClickedID);
    field.addEventListener('click', getClickedValue);
    field.addEventListener('click', checkNumber);
  }
};

// call functions in context

const drawNewNumbers = function () {
  setUpGrid('drawn');
  addDrawnNumbers();
};

const newGame = function () {
  setUpGrid('drawn');
  setUpGrid('scorecard');
  addDrawnNumbers();
  addScorecardNumbers();
};

document.onload = newGame();
