import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Foods-list');
    this.recipe = params.recipe; 
    console.log("Params: ", params); 
    console.log("Recipe: ", this.recipe); 
  }


  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    const data = await getData(`/static/js/views/JSON-data/${this.recipe}.json`); 
    
    //console.log(data);
    //console.log(this.recipe);
    let food=this.recipe;
    console.log(food);

    let listPosts = "<ul>";
    data.results.forEach(recipe => {
      //console.log(recipe.id);
      listPosts += `<li><a href='/food-view/${recipe.id}/${food}' data-link>${recipe.title}</a></li>`;
    });
    listPosts += "</ul>";

    return `<h1>Liste d'aliments</h1>` + listPosts+
    "<br>" +
    "<a href='/foods' data-link>Retourner</a>";
    
  }
}
