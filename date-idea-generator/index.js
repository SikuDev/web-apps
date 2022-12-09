//* Initalize values
// Variables
//-----------------------
const datesArray = ["Cinema", "Dinner", "Walk", "Beach"]
const initialCards = []

let mode = 0

const cardsSxn = document.getElementById("cards-sxn")
const editBtn = document.getElementById("edit-btn")
let dateBtn

let deleteBtnAll

// Classes
//-----------------------
class Card {
  constructor(date) {
    this.date = date;
    this.chance = 1;
  }
}
//-----------------------


//* Active Code
//-----------------------
// Initialize cards and render at start
initializeCards(datesArray)
renderAllCards(initialCards)

// Edit button toggle
editBtn.addEventListener("click", toggleMode)

// Date button
dateBtn = document.querySelectorAll(".text-btn")
dateBtn.forEach(date => date.addEventListener("click", function () {
  if (mode === 1) {
    let promptText = prompt()
    if (promptText == "") {
      if (this.textContent === null || this.textContent === "") {
        promptText = String.fromCharCode(160)
      } else {
        promptText = this.textContent
      }
    } else if (promptText == null) {
      promptText = this.textContent
    }
    document.getElementById(this.id).textContent = promptText
  }
}))
//-----------------------


//* Defining functions
//-----------------------
function initializeCards(array) {
  array.forEach(card => {
    initialCards.push(new Card(card))
  });
}

function renderAllCards(array) {
  array.forEach(card => {
    cardsSxn.innerHTML += `
    <div class="card-wrapper flex-center">
    <div class="idea-card grid-center">
    <button class="text-btn" id="date-btn${array.indexOf(card)}">${card.date}</button>
    <input class="slider" type="range" name="chance" min="1" max="3" step="1">
    </div>
    <button class="delete-btn" ></button>
    </div>
    `
  });
}

function toggleMode() {
  deleteBtnAll = document.querySelectorAll(".delete-btn")
  switch (mode) {
    case 0:
      mode = 1
      deleteBtnAll.forEach(el => el.style.width = "6rem")
      break
    case 1:
      deleteBtnAll.forEach(el => el.style.width = "0")
      mode = 0
      break
  }
}
//-----------------------