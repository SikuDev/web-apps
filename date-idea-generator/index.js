//* Initalize values
//-----------------------
// Constants
const initialArray = ["Cinema", "Dinner", "Walk", "Beach", "Play", "Kinky time", "Jog"]
const ideasArray = []
const cardsArray = []

const cardsSxn = document.getElementById("cards-sxn")
const editBtn = document.getElementById("edit-btn")
const mainBtn = document.getElementById("main-btn")
const popupEl = document.getElementById("popup")



mainBtn.addEventListener("click", function () {
  switch (mode) {
    case 0:
      generateIdea()
      break
    case 1:
      addCard()
      break
  }
})

// Variables
let ideaBtn
let deleteBtnAll

let mode = 0

// Classes
class Card {
  constructor(idea) {
    this.idea = idea;
    this.chance = 1;
  }
}
//-----------------------


//* Active Code
//-----------------------
// Initialize cards and render at start
initializeCards(initialArray)
renderInitalCards(cardsArray)

// Edit button toggle
editBtn.addEventListener("click", toggleMode)
//-----------------------


//* Defining functions
//-----------------------
function initCards() {

}

function initializeCards(array) {
  array.forEach(idea => {
    cardsArray.push(new Card(idea))
    ideasArray.push(idea)
  });
  console.log(ideasArray);
}

function renderInitalCards(array) {
  array.forEach(card => {
    cardsSxn.innerHTML += `
    <div class="card-wrapper flex-center">
      <div class="idea-card grid-center">
        <button class="text-btn" id="idea-btn${array.indexOf(card)}">${card.idea}</button>
       <input class="slider" type="range" name="chance" min="1" max="3" step="1">
      </div>
      <button class="delete-btn"></button>
    </div>
    `
    initialArray.forEach(idea => function () {
      if (idea == card.idea) {
        initialArray.splice(indexOf(idea), 1)
        console.log(initialArray);
      }
    })
  })
}

function toggleMode() {
  deleteBtnAll = document.querySelectorAll(".delete-btn")

  // Show delete buttons
  switch (mode) {
    case 0:
      mode = 1
      deleteBtnAll.forEach(btn => btn.style.width = "6rem")
      mainBtn.firstElementChild.textContent = "Add an idea"
      mainBtn.style.background = "hsl(270, 100%, 75%)"
      break
    case 1:
      mode = 0
      deleteBtnAll.forEach(btn => btn.style.width = "0")
      mainBtn.firstElementChild.textContent = "Give me a date!"
      mainBtn.style.background = "hsl(252, 100%, 75%)"
      break
  }
  resetBtns()
}

function generateIdea() {
  let resultArray = []
  let result = ""
  cardsArray.forEach(card =>
    resultArray = resultArray.concat(new Array(card.chance + 1).fill(card.idea))
  )
  result = resultArray[Math.floor(Math.random() * resultArray.length)]
  resultArray = []
  console.log(result);
  renderIdea(popup, result)
  return result
}

function renderIdea(el, idea) {
  let text = el.lastElementChild
  
  el.style.transform = "translateY(100%)"
  
  setTimeout(() => {
    text.textContent = idea
    el.style.transform = "translateY(0)"
  }, parseFloat(getComputedStyle(el).transitionDuration) * 1000);
  
  window.addEventListener('click', function (e) {
    if (document.getElementById('popup').contains(e.target)) {
      navigator.clipboard.writeText(text.textContent).then(function () {
        console.log('Async: Copying to clipboard was successful!');
        el.style.transform = "translateY(100%)"
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    } else {
      el.style.transform = "translateY(100%)"
    }
  });
}

function addCard(array) {
  let card = new Card(initialArray[Math.floor(Math.random() * initialArray.length)])
  cardsSxn.innerHTML = `
  <div class="card-wrapper flex-center">
  <div class="idea-card grid-center">
  <button class="text-btn" id="idea-btn${cardsArray.length}">${card.idea}</button>
  <input class="slider" type="range" name="chance" min="1" max="3" step="1">
  </div>
  <button class="delete-btn"></button>
  </div>
  ` + cardsSxn.innerHTML
  cardsSxn.firstElementChild.lastElementChild.style.width = "6rem"
  resetBtns()
  cardsSxn.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetBtns() {
  deleteBtnAll = document.querySelectorAll(".delete-btn")
  // Attach delete button function
  deleteBtnAll.forEach(btn => btn.addEventListener("click", function () {
    this.parentElement.remove()
  }))
  // Idea name button
  ideaBtn = document.querySelectorAll(".text-btn")
  ideaBtn.forEach(idea => idea.addEventListener("click", editText))
}

function editText() {
  if (mode === 1) {
    let promptText = prompt("Type in a date idea!")
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
}
//-----------------------