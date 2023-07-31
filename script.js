// global variables
let level = 1;
let score = 0;
let fieldId;

// get id for fields
const getFieldId = e => {
  fieldId = e.target.id;
};

// generate random numbers
const randomNumber = () => {
  let range = level * 10;
  console.log(range);
  let randomNumber = Math.floor(Math.random() * range + 1);
  //   console.log(randomNumber);
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
  }
};

const assignScorecardNumbers = function () {
  let scorecardGridArr = [];
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
  // console.log(scorecardGridArr);
  // don't forget to add bonus field (i = 3 / j = 3)
  // check margin in CSS
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
  let drawnNumbers = [];
  // repeat 5 times for amount of drawn numbers -> this is not the best solution
  for (let i = 1; i < 6; i++) {
    let drawnNumberObj = {};
    drawnNumberObj.id = 'drawnfield_' + i;
    drawnNumberObj.value = randomNumber();
    drawnNumberObj.addToFields = function () {
      document.getElementById(this.id).innerHTML = this.value;
    };
    drawnNumberObj.addToFields();
    drawnNumbers.push(drawnNumberObj);
  }
};

const printFieldId = function () {
  console.log(fieldId);
};

const randomTest = function () {
  console.log(randomNumber());
};

document.onload = buildScorecardGrid();
document.onload = buildDrawnNumbersFields();

const show_circle = function () {
  //   document.getElementById('match').style.visibility = 'visible';

  // create element
  let matchCircle;
  let newlyMatched = document.getElementById(fieldId);
  matchCircle = document.createElement('span');
  matchCircle.setAttribute('class', 'match_circle');
  matchCircle.setAttribute('id', 'circle');
  newlyMatched.append(matchCircle);

  // add element to DOM

  //   document.getElementById('match').style.visibility = 'visible';
};

const delete_circle = function () {
  let matchCircle;
  matchCircle = Array.from(document.getElementsByClassName('match_circle'));
  matchCircle.forEach(element => {
    element.remove();
  });

  //getElementsByClassName creates an array that isn't an array (HTMLCollection)
};

//
