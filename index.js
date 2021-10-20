const brewList = document.getElementById('brew-list');
const brewForm = document.getElementById('brew-form');
document.addEventListener("DOMContentLoaded", Api.getAllBreweries)
brewForm.addEventListener('submit', Brewery.searchBreweries);