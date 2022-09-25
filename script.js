const addUserBtn = document.getElementById("add-user")
const doubleMoneyBtn = document.getElementById("double-money")
const showMillionairesBtn = document.getElementById("show-millionaires")
const sortByRichestBtn = document.getElementById("sort-by-richest")
const calculateTotalBtn = document.getElementById("calculate-total")
const totalWealth = document.getElementById("total")
const persons = document.getElementById("persons")
let arrOfPersons = []

// Add 3 persons to the page
for (let i = 0; i < 3; i++) {
    addUser()
}

// Add Event Listeners
addUserBtn.addEventListener("click", addUser)
doubleMoneyBtn.addEventListener("click", doubleMoney)
showMillionairesBtn.addEventListener("click", showMillionaires)
sortByRichestBtn.addEventListener("click", sortByRichest)
calculateTotalBtn.addEventListener("click", calculateTotal)

// add new user
function addUser() {
    fetch("https://randomuser.me/api")
    .then(response => response.json())
    .then(data => data.results[0].name)
    .then(name => {
        arrOfPersons.push({
            name: `${name.first} ${name.last}`,
            wealth: parseFloat((Math.random() * 1000000).toFixed(2))
        })
        displayPersons()
    })
}

// display persons in the page
function displayPersons() {
    persons.innerHTML = ""
    arrOfPersons.forEach(person => {
        const div = document.createElement("div")
        const spanOne = document.createElement("span")
        const spanTwo = document.createElement("span")
    
        spanOne.innerText = person.name
        spanTwo.innerText = (person.wealth).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        div.append(spanOne, spanTwo)
        persons.appendChild(div)
    });
}

// Double money
function doubleMoney() {
    arrOfPersons = arrOfPersons.map(person => {
        return {
            ...person,
            wealth: person.wealth * 2
        }
    })
    displayPersons()
}

// Show millionaires
function showMillionaires() {
    arrOfPersons = arrOfPersons.filter(person => person.wealth >= 1000000)
    displayPersons()
}

// Sort By Richest
function sortByRichest() {
    arrOfPersons.sort((a, b) => b.wealth - a.wealth)
    displayPersons()
}

// Calculate Total wealth
function calculateTotal() {
    totalWealth.innerHTML = ""
    let total = arrOfPersons.reduce((total, person) => total + person.wealth, 0)
    total = parseFloat(total.toFixed(2))

    const spanOne = document.createElement("span")
    const spanTwo = document.createElement("span")
    spanOne.innerText = "Total Wealth:"
    spanTwo.innerText = total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    totalWealth.append(spanOne, spanTwo)
}