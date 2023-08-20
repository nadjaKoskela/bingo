// global variables

let level = 1;
let score = 0;
let drawnNumbers = [];
let circleArray = [];
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

let winningPatternsInGame = JSON.parse(JSON.stringify(winningPatterns));

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
  let animateCircleId = 'animateCircle_' + circleArray.length;

  circle = document.createElement('span');
  circle.setAttribute('class', 'matched_circle');

  circle.setAttribute('id', animateCircleId);
  field.append(circle);
  circleArray.push(animateCircleId);
  animateCircles();
};

const updateScore = function () {
  let scoreField = document.getElementById('score');
  scoreField.textContent = score;
};

const updateLevel = function () {
  let levelField = document.getElementById('level');
  levelField.textContent = level;
};

// check numbers on click

const checkWinningPatterns = function () {
  for (let i = 0; i < winningPatternsInGame.length; i++) {
    if (winningPatternsInGame[i].length === 1) {
      changeScore(winningPatternsInGame[i][0]);
      levelUp();
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

const checkNumberOnClick = function () {
  if (drawnNumbers.includes(clickedValue)) {
    addMatchedCircle();
    changeScore(5);
    updateWinningPatterns();
    checkWinningPatterns();
  } else {
    changeScore(-3);
  }
};

// score functionality

const changeScore = function (scoreChange) {
  if (scoreChange) {
    score += scoreChange;
  }
  if (score < 0) {
    score = 0;
  }
  setTimeout(updateScore, 500);
};

// level up

const levelUp = function () {
  level++;
  setUpGrid('drawn');
  setUpGrid('scorecard');
  addDrawnNumbers();
  addScorecardNumbers();
  updateLevel();
  winningPatternsInGame = JSON.parse(JSON.stringify(winningPatterns));
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
    circleArray.length = 0; // this here
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
    field.addEventListener('click', checkNumberOnClick);
  }
};

// call functions in context

const drawNewNumbers = function () {
  setUpGrid('drawn');
  addDrawnNumbers();
  changeScore(-25);
};

const newGame = function () {
  setUpGrid('drawn');
  setUpGrid('scorecard');
  addDrawnNumbers();
  addScorecardNumbers();
  level = 1;
  score = 0;
  updateLevel();
  updateScore(score);
  winningPatternsInGame = JSON.parse(JSON.stringify(winningPatterns));
};

const addEvents = function () {
  document
    .getElementById('drawnewnumbers')
    .addEventListener('click', drawNewNumbers);
  document.getElementById('newgame').addEventListener('click', newGame);
};

document.onload = newGame();
document.onload = addEvents();

// animations

const animateCircles = function () {
  const circleColor = getComputedStyle(
    document.querySelector(':root')
  ).getPropertyValue('--circle-color');

  let animatedCircleId = circleArray.slice(-1);

  let circleTransparency = 0;
  let circleSize = 10;

  let circleTransparencyInterval = setInterval(circleTransparencyAnimation, 25);
  let circleSizeInterval = setInterval(circleSizeAnimation, 25);

  function circleTransparencyAnimation() {
    if (circleTransparency <= 1) {
      circleTransparency += 0.05;
      document.getElementById(animatedCircleId).style.borderColor =
        circleColor.slice(0, -1) + ', ' + circleTransparency;
    } else {
      clearInterval(circleTransparencyInterval);
    }
  }

  function circleSizeAnimation() {
    if (circleSize < 80) {
      circleSize += 5;
      document.getElementById(animatedCircleId).style.width = circleSize + '%';
      document.getElementById(animatedCircleId).style.height = circleSize + '%';
    } else {
      clearInterval(circleSizeInterval);
    }
  }
};
