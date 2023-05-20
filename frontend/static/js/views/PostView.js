import AbstractView from "./AbstractView.js";

export default class extends AbstractView{

    constructor(params){
        super(params)
        this.setTitle('Visualiser Article')
        this.food = params.food; 
        console.log("Food: ", this.food);
    }

    async getHtml(){
        //console.log(this.params.id);
        const nu = Number(this.params.id)

        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }
        
      


        const data = await getData(`/static/js/views/${this.food}.json`); // Use this.recipe
        // console.log(data.results);
        const article = data.results.find(item => item.id === nu)

        console.log(article.title);
        return "<div class='position'>" +"<h1>" + article.title + "</h1>" +
        "<img class='image' src='" + article.image + "' alt='" + article.title + "'>" +
        "<br>" +
        "<a href='/posts' data-link>Retourner</a>"+"</div>"
    }
}