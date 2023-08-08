// global variables

let level = 1;
let score = 0;
let drawnNumbers = [];
let clickedID;
let clickedValue;

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
    field.addEventListener('click', getFieldID);
    field.addEventListener('click', getFieldValue);
    field.addEventListener('click', printFieldInfo);
  }
};

// call functions in context

// test functions
const printFieldInfo = function () {
  console.log(fieldID);
  console.log(fieldValue);
};

const newGame = function () {
  setUpGrid('drawn');
  setUpGrid('scorecard');
  addDrawnNumbers();
  addScorecardNumbers();
};

document.onload = newGame();
