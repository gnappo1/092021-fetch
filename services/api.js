class Api {
    static BASE_URL = 'https://api.openbrewerydb.org/breweries';

    static getAllBreweries() {
        fetch(Api.BASE_URL)
        .then(resp => resp.json())
        .then(breweriesJson => {
            if (breweriesJson.length > 0) {
                breweriesJson.forEach(brewObj => {
                    const brewery = new Brewery(brewObj)
                    brewery.renderBrew()
                })
            } else {
                Brewery.returnNone()
            }
        })
        .catch((err) => alert(err))
    }

    static getBreweriesByCity(city){
        fetch(`${Api.BASE_URL}?by_city=${city}`)
        .then(resp => resp.json())
        .then(breweriesJson => {
            if (breweriesJson.length > 0) {
                breweriesJson.forEach(brewObj => {
                    const brewery = new Brewery(brewObj.name, brewObj.id, brewObj.type, brewObj.city, brewObj.state, brewObj.phone)
                    brewery.renderBrew()
                })
            } else {
                Brewery.returnNone()
            }
        })
        .catch((err) => alert(err))
    }
}