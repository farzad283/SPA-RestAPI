import AbstractView from "./AbstractView.js"

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.setTitle('Dashboard')
    }

    async getHtml(){
        return `
        <div class=position_Dash>
        <h1><a href="/foods" data-link>Rechercher des recettes</a></h1>
        <img class=position_img src="static/img/recherch.jpg">
        <p>Recherchez parmi des milliers de recettes à l'aide d'un filtrage et d'un classement avancés. REMARQUE : Cette méthode combine la recherche par requête, par ingrédients et par nutriments en un seul point final.</p>
        </div>
        `

    }
}