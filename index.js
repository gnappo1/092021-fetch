const mythsContainer = () => document.getElementById("myths-container")
const godsContainer = () => document.getElementById("gods-container")
const godsForm = () => document.getElementById("gods-form")

document.addEventListener("DOMContentLoaded", () => {
    getMyths()
    getGods()
    godsForm().addEventListener("submit", handleSubmit)
})

function handleSubmit(e) {
    e.preventDefault()
    const name = e.target[0].value
    const romanname = e.target[1].value
    const symbol = e.target[2].value
    const power = e.target[3].value
    const father = e.target[4].value
    const mother = e.target[5].value
    const url = e.target[6].value
    const newGod = {name, romanname, symbol, power, father, mother, url}
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newGod)
    }
    godsForm().reset()
    fetch("http://localhost:3000/gods", configObj)
    .then(resp => resp.json())
    .then(god => makeGod(god))
    .catch(error => alert(error))
}

function getMyths() {
    fetch("http://localhost:3000/myths")
    .then(res => res.json())
    .then(myths => myths.length > 0 ? myths.forEach(makeMyth) : returnNone())
    .catch(error => console.log(error))
}

function getGods() {
    fetch("http://localhost:3000/gods")
    .then(res => res.json())
    .then(gods => gods.length > 0 ? gods.forEach(makeGod) : returnNone())
    .catch(error => console.log(error))
}

function returnNone() {
    const div = document.createElement('div');
    div.className='card alert-warning';
    div.style = 'padding: 20px; margin: 20px;'
    
    const icon = document.createElement('h1');
    icon.textContent='😢';

    const header = document.createElement('h3')
    header.textContent = "No Myths Found";

    div.append(icon, header);
    mythsContainer().appendChild(div);
}

function slugify(string) {
    return string.toLowerCase().replaceAll(" ", "-")
}

function makeMyth(myth) {
    const div = document.createElement('div');
        div.id = `myth-card-${slugify(myth.name)}`;
        div.className= 'card alert-success';
        div.style = 'padding: 20px; margin: 20px;'

        const title = document.createElement('h1');
        title.textContent= myth.name;
        
        const header = document.createElement('h3')
        header.textContent = myth.gods;

        const p = document.createElement('p')
        p.id = `myth-info-${slugify(myth.name)}`
        p.textContent =  myth.description
        div.append(title, header, p);
        mythsContainer().appendChild(div);
}

function makeGod(god) {
    const div = document.createElement('div');
    div.id = `god-card-${slugify(god.name)}`;
    div.className= 'card alert-success';
    div.style = 'padding: 20px; margin: 20px;'

    const title = document.createElement('h1');
    title.textContent= god.name;
    
    const header = document.createElement('h3')
    header.textContent = god.romanname;

    const p = document.createElement('p')
    p.id = `god-info-${slugify(god.name)}`
    p.textContent =  god.power
    div.append(title, header, p);
    godsContainer().appendChild(div);
}

