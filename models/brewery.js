class Brewery {
    static all = []
    
    constructor({name, id, brewery_type, city, state, phone}) {
        this.name = name
        this.id = id
        this.type = brewery_type
        this.city = city
        this.state = state
        this.phone = phone || "Not in our records"
        Brewery.all.push(this)
    }

    renderBrew(){
        const div = document.createElement('div');
        div.id = `brew-card-${this.id}`;
        div.className= 'card alert-success';
        div.style = 'padding: 20px; margin: 20px;'

        const icon = document.createElement('h1');
        icon.textContent='🍺';
        
        const header = document.createElement('h3')
        header.textContent = `${this.name}`;

        const p = document.createElement('p')
        p.id = `brew-info-${this.id}`
        p.textContent = `
            Type: ${this.type} - 
            City: ${this.city} -
            State: ${this.state} - 
            Phone: ${this.phone}
        `
        div.append(icon, header, p);
        brewList.appendChild(div);
    }

    static returnNone() {
        const div = document.createElement('div');
        div.className='card alert-warning';
        div.style = 'padding: 20px; margin: 20px;'
        
        const icon = document.createElement('h1');
        icon.textContent='😢';

        const header = document.createElement('h3')
        header.textContent = "No Breweries Found";

        div.append(icon, header);
        brewList.appendChild(div);
    }

    static searchBreweries(e) {
        e.preventDefault()
        const city = e.target[0].value
        e.target.reset()
        Api.getBreweriesByCity(city)
        brewList.replaceChildren()
    }
}