const ideas = ["Beach", "Brewery Tour", "Broadway", "Comedy Club", "Crabbing", "Day Tripping", "DIY Project", "Drive-in Theater", "Escape Rooms", "Eighties", "Exotic Eats", "Explore", "Festival", "Flower Fields", "Food Tour", "Getaway", "Gondola Ride", "Glamping", "Hike", "Hot Air Balloon", "Hot Springs", "Ice Cream", "Ice Skating", "Improv", "Java", "Jetski", "Jigsaw Puzzle", "Karaoke", "Kayak", "Kite Flying", "Lake", "Leaf Peeping", "Local Adventure", "Meteor Shower", "Murals", "Musical", "National Parks", "Nature", "Netflix and Chill", "New Restaurant", "Observatory", "Ocean", "Orchard", "Piano Bar", "Picnic", "Pinterest Project", "Quadruple Date", "Quarters", "Quartz Hunting", "Quiet", "Quilt", "Quirky", ",Quickie ;)", "Quiz", "Recipe", "Rock Climb", "RV", "Salsa Dance", "Stargaze", "Subscription Box Dates", "Tea Tasting", "Travel", "Tubing", "U-Pick Farm", "Unplugged", "Upscale", "Vacation", "Vino", "Volunteer", "Walking Tour", "Waterfall Hike", "Whale Watching", "Xbox", "Xtreme Sports", "Yard Sale", "Yes", "Zipline", "Zoo", "Zzzz’s",]

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
const sliders = document.getElementsByClassName("slider")
const deleteBtns = document.getElementsByClassName("delete-btn")
const editBtn = document.getElementById("edit-btn")

editBtn.addEventListener("click", toggleMode)

const cardsArray = []

let editMode = false
let amount = 10

shuffle(ideas)
shuffle(ideas)
initCards(10)
initUiBtns()
initSliders()

function initCards(amount) {
  for (let i = 0; i < amount; i++) {
    let randomIndex = Math.floor(Math.random() * ideas.length)
    cardsArray.push(new Card(String(ideas.splice(randomIndex, 1)), section, false))
  }
  initDeleteBtns()
}

function initUiBtns() {
  mainBtn.addEventListener("click", function () {
    if (editMode) {
      addIdea()
    } else {
      generateIdea()
    }
  })
}

function initSliders() {
  for (let i = 0; i < sliders.length; i++) {
    const element = sliders[i]
    element.addEventListener("change", function () {
      cardsArray[Math.abs(i - (sliders.length - 1))].chance = sliders[i].value
    })
  }
}

//TODO: Delete buttons are not return the right idea to the array
function initDeleteBtns() {
  for (let i = 0; i < deleteBtns.length; i++) {
    const element = deleteBtns[i]
    element.addEventListener("click", function () {
      let text =
        element.parentElement.firstElementChild.firstElementChild.textContent

      if (ideas.includes(text)) {
        console.log(ideas)
        console.log(text)
      } else {
        ideas.push(text)
      }

      cardsArray.forEach(function (card) {
        if (card.idea == text) {
          delete card
        }
      })

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
  section.scrollTo({ top: 0, behavior: 'smooth' })
  initDeleteBtns()
  initSliders()
}

function generateIdea() {
  let resultArray = []

  cardsArray.forEach(function (card) {
    console.log(card.chance);
    resultArray = resultArray.concat(new Array(Number(card.chance)).fill(card.idea))
  })

  let randomIndex = Math.floor(Math.random() * resultArray.length)
  console.log(resultArray)
}

// Fisher-Yates (aka Knuthh) Shuffle
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
  }
  return array
}

function editText() {
  if (editMode === 1) {
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