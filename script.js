// global variables
let level = 1;
let score = 0;
let fieldId;

// create grid

const buildGrid = function () {
  // gradually add fields to div with id numgrid
  let numgrid = document.getElementById('numgrid'); // get div into code
  for (let i = 1; i < 6; i++) {
    let newRow;
    newRow = document.createElement('div');
    newRow.setAttribute('id', `row${i}`);
    newRow.setAttribute('class', 'numrow');
    numgrid.append(newRow);
    for (let j = 1; j < 6; j++) {
      let newField;
      newField = document.createElement('div'); // create new element
      newField.setAttribute('id', `field_${i}-${j}`);
      newField.setAttribute('class', 'numfield');
      newField.textContent = 'Test'; // set element content
      newRow.append(newField); // add new element to div
    }
    // get id for fields
    const getFieldId = e => {
      fieldId = e.target.id;
    };
    const numFields = document.getElementsByClassName('numfield');
    console.log(numFields);
    for (let field of numFields) {
      field.addEventListener('click', getFieldId);
    }
  }
};

// generate random numbers

const randomNumber = () => {
  let range = level * 10;
  console.log(range);
  let randomNumber = Math.floor(Math.random() * range + 1);
  //   console.log(randomNumber);
  return randomNumber;
};

// assign numbers to scorecard

const assignNumbers = function () {
  let numGridArr = [];
  for (let i = 1; i < 6; i++) {
    for (let j = 1; j < 6; j++) {
      // create object
      let numGridObj = {};
      numGridObj.id = 'field_' + i + '-' + j;
      numGridObj.value = randomNumber();
      numGridObj.matched = false;
      // assign value to grid
      numGridObj.addToGrid = function () {
        document.getElementById(this.id).innerHTML = this.value;
      };
      numGridObj.addToGrid();
      // add object to array
      numGridArr.push(numGridObj);
    }
  }
  console.log(numGridArr);
  // don't forget to add bonus field (i = 3 / j = 3)
};

const printFieldId = function () {
  console.log(fieldId);
};

const randomTest = function () {
  console.log(randomNumber());
};

document.onload = buildGrid();

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

// next steps
// create draw numbers
