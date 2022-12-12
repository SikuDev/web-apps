const ideas = ["Beach", "Brewery Tour", "Broadway", "Choose Your Own Adventure", "Comedy Club", "Crabbing", "Day Tripping", "DIY Project", "Drive-in Theater", "Escape Rooms", "Eighties", "Exotic Eats", "Festival", "Flower Fields", "Food Tour", "Getaway", "Gondola Ride", "Glamping", "Hike", "Hot Air Balloon", "Hot Springs", "Ice Cream", "Ice Skating", "Improv", "Java", "Jetski", "Jigsaw Puzzle", "Karaoke", "Kayak", "Kite Flying", "Lake", "Leaf Peeping", "Local Adventure", "Meteor Shower", "Murals", "Musical", "National Parks", "Nature", "Netflix and Chill", "Observatory", "Ocean", "Orchard", "Piano Bar", "Picnic", "Pinterest Project", "Quadruple Date", "Quarters", "Quartz Hunting", "Quiet", "Quilt", "Quirky", ",Quickie ;)", "Quiz", "Recipe", "Rock Climb", "RV", "Salsa Dance", "Stargaze", "Subscription Box Dates", "Tea Tasting", "Travel, Tubing", "U-Pick Farm", "Unplugged", "Upscale", "Vacation", "Vino", "Volunteer", "Walking Tour", "Waterfall Hike", "Whale Watching", "Xbox", "Xplore", "Xtreme Sports", "Yard Sale", "Yelp a New Restaurant", "Yes", "Zipline", "Zoo", "Zzzz’s"]

// Classes
class Card {
    constructor(idea, section) {
        this.idea = idea;
        this.chance = 1;
        this.mode = false;

        section.innerHTML = `<div class="card" id="card${cards.length}">
            <div class="face">
                <button class="text-btn">${idea}</button>
                <div class="slider-label">
                    <p class="dots">.&nbsp;&nbsp;</p>
                    <p class="dots">..</p>
                    <p class="dots">...</p>
                </div>
                <input class="slider" type="range" name="chance" min="1" max="3" step="1" value="${this.chance}">
            </div>
            <button class="delete-btn"></button>
        </div>` + section.innerHTML
    }

    toggleMode(){
        this.mode = mode
        
    }

    delete() {
        delete this
    }

    rename() {

    }

    render() {

    }
}

let editMode = false
let amount = 10
const cardsArray = []

const cards = document.getElementsByClassName("card")
const section = document.getElementById("section")
const editBtn = document.getElementById("edit-btn")

initCards(10)




function initCards(amount) {

    for (let i = 0; i < amount; i++) {
        let randomIndex = Math.floor(Math.random() * ideas.length)
        cardsArray.push(new Card(ideas.splice(randomIndex, 1), section))
    }
}

function toggleMode() {
    if (editMode === false) {
        editMode = true
    } else {
        editMode = false
    }
}

function generateIdea() {

}