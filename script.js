console.log("Welcome to Coulette");

//Add a global variable for colors
let colors = [];

//Add a global variable for current color
let currentColor = null;

//Generate random number
function randomNumber(min, max) {
  const num = Math.random() * (max - min + 1) + min;
  return Math.floor(num);
}

//Generate random hex number
function randomHexNumber() {
  let hex = randomNumber(0, 255).toString(16);
  if (hex.length === 1) {
    hex = "0" + hex;
  }
  return hex;
}

//Generate random hex color
function randomHexColor() {
  const red = randomHexNumber();
  const green = randomHexNumber();
  const blue = randomHexNumber();

  return ("#" + red + green + blue).toUpperCase();
}

//Function to generate random color
function generateColor() {
  //Set variable for random color
  const randomColor = randomHexColor();

  //Get reference for header and paragraph
  const header = document.querySelector("header");
  const colorText = document.querySelector("#colorValue");

  //Set header background and  paragraph text to random color
  header.style.backgroundColor = randomColor;
  colorText.textContent = randomColor;

  //Update variable for current color
  currentColor = randomColor;

  //Update status of button for color change
  updateSaveButton();
}

//Function to save random color
function saveColor() {
  //Read current hex value
  const colorValueEl = document.querySelector("#colorValue");
  const color = colorValueEl.innerText;

  //Create list item
  const colorList = document.querySelector("#colors");
  const newColor = document.createElement("li");

  //Set list item to random color
  newColor.style.backgroundColor = color;
  newColor.textContent = color;
  newColor.setAttribute("data-color", color);

  //Add list item to color list
  colorList.appendChild(newColor);

  //Duplicate check
  if (!colors.includes(currentColor)) {
    colors.push(currentColor);
  }

  //Save colors array to the local storage
  saveColorsToLocalStorage();

  //Create delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";

  //Add delete button
  newColor.appendChild(deleteButton);

  //Add event listener to delete button
  deleteButton.addEventListener("click", deleteColor);

  //Update status of button for color change
  updateSaveButton();
}

function initGenerateBtnListener() {
  //Get reference for button to generate color
  const generateColorBtn = document.querySelector("#generateBtn");
  //Add event listener to button
  generateColorBtn.addEventListener("click", generateColor);
}

function initSaveColorBtnListener() {
  //Get reference for button to save color
  const saveColorBtn = document.querySelector("#saveBtn");

  //Add event listener to button
  saveColorBtn.addEventListener("click", saveColor);
}

//Function to update status of button for color save
function updateSaveButton() {
  //Get reference for button to save color
  const saveColorBtn = document.querySelector("#saveBtn");

  //Check if current color is already added
  if (colors.includes(currentColor)) {
    saveColorBtn.setAttribute("disabled", "");
  } else {
    saveColorBtn.removeAttribute("disabled");
  }
}

//Function to delete list item
function deleteColor(clickEvent) {
  //Add variable for the list item corresponding to clicked delete button
  const colorLiElement = clickEvent.target.parentElement;

  //Get color value of list item and index in colors array
  let colorValue = colorLiElement.getAttribute("data-color");
  let deleteColorIndex = colors.indexOf(colorValue);

  //Remove color value from colors array
  colors.splice(deleteColorIndex, 1);

  //Remove list item
  colorLiElement.remove();

  //Save colors array to the local storage
  saveColorsToLocalStorage();
}

//Function to save the colors array to the local storage
function saveColorsToLocalStorage() {
  const colorsAsJson = JSON.stringify(colors);
  localStorage.setItem("colors", colorsAsJson);
}

//Function to read the colors from the local storage
function readColorsFromLocalStorage() {
  const colorsInLocalStorage = localStorage.getItem("colors");

  if (colorsInLocalStorage !== null) {
    const colorsInLocalStorageAsArray = JSON.parse(colorsInLocalStorage);
    colors = colorsInLocalStorageAsArray;
  }

  colors.forEach((colour) => {
    const colorList = document.querySelector("#colors");
    const newColor = document.createElement("li");

    //Set list item to random color
    newColor.style.backgroundColor = colour;
    newColor.textContent = colour;
    newColor.setAttribute("data-color", colour);

    //Add list item to color list
    colorList.appendChild(newColor);

    //Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";

    //Add delete button
    newColor.appendChild(deleteButton);

    //Add event listener to delete button
    deleteButton.addEventListener("click", deleteColor);
  });

  //Get reference for header and paragraph
  const header = document.querySelector("header");
  const colorText = document.querySelector("#colorValue");

  //Set header background and  paragraph text to random color
  header.style.backgroundColor = colors[colors.length - 1];
  colorText.textContent = colors[colors.length - 1];
}

//Function for initialization of coulette
function init() {
  readColorsFromLocalStorage();
  initGenerateBtnListener();
  initSaveColorBtnListener();
}

//Initializing coulette
init();
