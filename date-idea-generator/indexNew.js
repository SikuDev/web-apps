const ideas = [
  "Beach",
  "Brewery Tour",
  "Broadway",
  "Choose Your Own Adventure",
  "Comedy Club",
  "Crabbing",
  "Day Tripping",
  "DIY Project",
  "Drive-in Theater",
  "Escape Rooms",
  "Eighties",
  "Exotic Eats",
  "Explore",
  "Festival",
  "Flower Fields",
  "Food Tour",
  "Getaway",
  "Gondola Ride",
  "Glamping",
  "Hike",
  "Hot Air Balloon",
  "Hot Springs",
  "Ice Cream",
  "Ice Skating",
  "Improv",
  "Java",
  "Jetski",
  "Jigsaw Puzzle",
  "Karaoke",
  "Kayak",
  "Kite Flying",
  "Lake",
  "Leaf Peeping",
  "Local Adventure",
  "Meteor Shower",
  "Murals",
  "Musical",
  "National Parks",
  "Nature",
  "Netflix and Chill",
  "Observatory",
  "Ocean",
  "Orchard",
  "Piano Bar",
  "Picnic",
  "Pinterest Project",
  "Quadruple Date",
  "Quarters",
  "Quartz Hunting",
  "Quiet",
  "Quilt",
  "Quirky",
  ",Quickie ;)",
  "Quiz",
  "Recipe",
  "Rock Climb",
  "RV",
  "Salsa Dance",
  "Stargaze",
  "Subscription Box Dates",
  "Tea Tasting",
  "Travel",
  "Tubing",
  "U-Pick Farm",
  "Unplugged",
  "Upscale",
  "Vacation",
  "Vino",
  "Volunteer",
  "Walking Tour",
  "Waterfall Hike",
  "Whale Watching",
  "Xbox",
  "Xtreme Sports",
  "Yard Sale",
  "Yelp a New Restaurant",
  "Yes",
  "Zipline",
  "Zoo",
  "Zzzz’s",
]

// Classes
class Card {
  constructor(idea, section, mode) {
    this.index = cards.length
    this.idea = idea
    this.chance = 1
    this.mode = mode
    this.deleteId = `delete-btn${this.index}`

    section.innerHTML =
      `<div class="card" id="card${this.index}">
            <div class="face">
                <button class="text-btn">${this.idea}</button>
                <div class="slider-label">
                    <p class="dots">.&nbsp;&nbsp;</p>
                    <p class="dots">..</p>
                    <p class="dots">...</p>
                </div>
                <input class="slider" type="range" name="chance" min="1" max="3" step="1" value="${this.chance}">
            </div>
            <button id="${this.deleteId}" class="delete-btn"></button>
        </div>` + section.innerHTML

    let btn = document.getElementById(`delete-btn${this.index}`)
    if (mode) {
      btn.style.width = "6rem"
    }
  }
}

const cards = document.getElementsByClassName("card")
const section = document.getElementById("section")
const mainBtn = document.getElementById("main-btn")
const editBtn = document.getElementById("edit-btn")
const deleteBtns = document.getElementsByClassName("delete-btn")

editBtn.addEventListener("click", toggleMode)

const cardsArray = []

let editMode = false
let amount = 10

initCards(10)

function initCards(amount) {
  for (let i = 0; i < amount; i++) {
    let randomIndex = Math.floor(Math.random() * ideas.length)
    cardsArray.push(new Card(ideas.splice(randomIndex, 1), section, false))
  }
  initDeleteBtns()
}

function initUiBtns() {
  mainBtn.addEventListener("click", function(){
    if (editMode){
      console.log(true)
      addIdea()
    }
  })
}

function initDeleteBtns() {
  for (let i = 0; i < deleteBtns.length; i++) {
    const element = deleteBtns[i]
    element.addEventListener("click", function () {
      let text =
        element.parentElement.firstElementChild.firstElementChild.textContent

      if (text.length > 1 && ideas.includes(text)) {
        console.log(ideas)
        console.log(text)
      } else {
        ideas.push(text)
        console.log(ideas)
        console.log(text)
      }
      element.parentElement.remove()
    })
  }
}

function toggleMode() {
  if (cards.length > 0) {
    if (editMode === false) {
      editMode = true
      showDeleteBtns(true)
      showAddBtn(true)
    } else {
      editMode = false
      showDeleteBtns(false)
      showAddBtn(false)
    }
  } else {
    editMode = 1
  }
}

function showDeleteBtns(state) {
  let btns = Array.from(document.getElementsByClassName("delete-btn"))
  if (state) {
    btns.forEach((btn) => {
      btn.style.width = "6rem"
      btn.addListener
    })
  } else {
    btns.forEach((btn) => {
      btn.style.width = "0rem"
    })
  }
}

function showAddBtn(state) {
  if (state) {
    mainBtn.firstElementChild.textContent = "Add an idea"
  } else {
    mainBtn.firstElementChild.textContent = "Give me a date!"
  }
}

function addIdea() {
  let randomIndex = Math.floor(Math.random() * ideas.length)
  let card = new Card(ideas.splice(randomIndex, 1), section, editMode)
  cardsArray.push(card)
  let dlt = document.getElementById(`${cardsArray[cardsArray.length-1].deleteId}`)
  console.log(ideas)
}

function generateIdea() {
  console.log(cards[0])
}
