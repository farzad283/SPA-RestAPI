import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Posts');
    this.recipe = params.recipe; // Store the recipe parameter
    console.log("Params: ", params); // Add this line
    console.log("Recipe: ", this.recipe); // And this line
  }


  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    const data = await getData(`/static/js/views/${this.recipe}.json`); // Use this.recipe
    
    //console.log(data);
    //console.log(this.recipe);
    let food=this.recipe;
    console.log(food);

    let listPosts = "<ul>";
    data.results.forEach(recipe => {
      //console.log(recipe.id);
      listPosts += `<li><a href='/post-view/${recipe.id}/${food}' data-link>${recipe.title}</a></li>`;
    });
    listPosts += "</ul>";

    return `<h1>Posts</h1>` + listPosts+
    "<br>" +
    "<a href='/posts' data-link>Retourner</a>";
    
  }
}
