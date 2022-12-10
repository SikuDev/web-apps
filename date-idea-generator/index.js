//* Initalize values
//-----------------------
// https://localadventurer.com/alphabet-dating-fun-date-ideas-from-a-z/
// Constants
const initialArray = ["Beach","Brewery Tour","Broadway","Choose Your Own Adventure","Comedy Club","Crabbing","Day Tripping","DIY Project","Drive-in Theater","Escape Rooms","Eighties","Exotic Eats","Festival","Flower Fields","Food Tour","Getaway","Gondola Ride","Glamping","Hike","Hot Air Balloon","Hot Springs","Ice Cream","Ice Skating","Improv","Java","Jetski","Jigsaw Puzzle","Karaoke","Kayak","Kite Flying","Lake","Leaf Peeping","Local Adventure","Meteor Shower","Murals","Musical","National Parks","Nature","Netflix and Chill","Observatory","Ocean","Orchard","Piano Bar","Picnic","Pinterest Project","Quadruple Date","Quarters","Quartz Hunting","Quiet","Quilt","Quirky",",Quickie ;)","Quiz","Recipe","Rock Climb","RV","Salsa Dance","Stargaze","Subscription Box Dates","Tea Tasting","Travel, Tubing","U-Pick Farm","Unplugged","Upscale","Vacation","Vino","Volunteer","Walking Tour","Waterfall Hike","Whale Watching","Xbox","Xplore","Xtreme Sports","Yard Sale","Yelp a New Restaurant","Yes","Zipline","Zoo","Zzzz’s"]
const cardsArray = []
let ideasArray = []

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
let chanceSlider
let deleteBtnAll

let mode = 0

// Classes
class Card {
  constructor(idea, chance) {
    this.idea = idea;
    this.chance = chance;
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
function initializeCards(array) {
  array.forEach(idea => {
    cardsArray.push(new Card(idea, 2))
    array.pop(idea)
  });
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
  chanceSlider = document.querySelectorAll(".slider")

  chanceSlider.forEach(function(slider){
    let idea = slider.parentElement.firstElementChild.textContent
    let chance = Number(slider.value)
    ideasArray = ideasArray.concat(new Array(chance).fill(idea))
  })

  let result = `${ideasArray[Math.floor(Math.random() * ideasArray.length)]}`
  renderIdea(popupEl, result)
  ideasArray = []
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

        el.style.transform = "translateY(100%)"
      }, function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    } else {
      el.style.transform = "translateY(100%)"
    }
  });
}

function addCard() {
  let text = initialArray[Math.floor(Math.random() * initialArray.length)]
  let card = new Card(text, 2)
  
  cardsSxn.innerHTML = `
  <div class="card-wrapper flex-center">
  <div class="idea-card grid-center">
  <button class="text-btn" id="idea-btn${cardsArray.length}">${text}</button>
  <input class="slider" type="range" name="chance" min="1" max="3" step="1">
  </div>
  <button class="delete-btn"></button>
  </div>
  ` + cardsSxn.innerHTML
  cardsSxn.firstElementChild.lastElementChild.style.width = "6rem"
  resetBtns()
  cardsSxn.scrollTo({ top: 0, behavior: 'smooth' });
  console.log(ideasArray);
}

function resetBtns() {
  deleteBtnAll = document.querySelectorAll(".delete-btn")
  // Attach delete button function
  deleteBtnAll.forEach(btn => btn.addEventListener("click", function () {
    // let text = this.parentElement.firstElementChild.firstElementChild.textContent
    // console.log(text)
    // if (text.length > 1){
    //   ideasArray.push(text)
    // }
    this.parentElement.remove()
    console.log(ideasArray)
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