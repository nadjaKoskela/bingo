// global variables
let level = 1;
let score = 0;
let fieldId;
let fieldValue;
let drawnNumbers = [];
let scorecardGridArr = [];

// get id for fields
const getFieldId = e => {
  fieldId = e.target.id;
};

// get value for fields
const getFieldValue = e => {
  fieldValue = Number(e.target.textContent);
};

const checkNumber = function () {
  let i = 0;
  while (i < drawnNumbers.length) {
    if (fieldValue === drawnNumbers[i].value) {
      // console.log('found!');
      showMatchCircle();
    }
    i++;
  }
  // this has an error after reloading the scorecard grid
};

// generate random numbers
const randomNumber = () => {
  let range = level * 10;
  let randomNumber = Math.floor(Math.random() * range + 1);
  return randomNumber;
};

// create scorecard grid
const buildScorecardGrid = function () {
  // gradually add fields to div with id numgrid
  let numgrid = document.getElementById('scorecardgrid'); // get div into code
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
  // console.log(numFields);
  for (let field of scorecardField) {
    field.addEventListener('click', getFieldId);
    field.addEventListener('click', getFieldValue);
    field.addEventListener('click', checkNumber);
  }
};

const assignScorecardNumbers = function () {
  for (let i = 1; i < 6; i++) {
    // this is not the best solution -> should be more dynamic
    for (let j = 1; j < 6; j++) {
      // create object
      let scorecardGridObj = {};
      scorecardGridObj.id = 'scorecardfield_' + i + '-' + j;
      scorecardGridObj.value = randomNumber();
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

// create drawnNumbers
const buildDrawnNumbersFields = function () {
  let drawnNumbersFields = document.getElementById('drawnNumbers');
  for (let i = 1; i < 6; i++) {
    let newField;
    //create element
    newField = document.createElement('div');
    // set attributes
    newField.setAttribute('id', `drawnfield_${i}`);
    newField.setAttribute('class', 'drawnfield');
    // append parent element
    drawnNumbersFields.append(newField);
  }
};

// assign numbers to drawnNumbers

const assignDrawnNumbers = function () {
  // repeat 5 times for amount of drawn numbers -> this is not the best solution
  let alreadyDrawnNumbers = [];
  for (let i = 1; i < 6; i++) {
    let drawnNumberObj = {};
    let newNumber = randomNumber();
    // avoid duplicates in drawnNumber
    while (alreadyDrawnNumbers.includes(newNumber)) {
      newNumber = randomNumber();
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
};

document.onload = buildScorecardGrid();
document.onload = buildDrawnNumbersFields();

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
