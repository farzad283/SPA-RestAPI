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

    // Fetch the list of JSON files
    const fileList = await getData('/jsonfiles'); // Replace with your server's address
    console.log(fileList);

    let listPosts = "<ul>";
    fileList.forEach(listeReciepe => {
      console.log(listeReciepe);

      listPosts += `<li><a href='/posts1/${listeReciepe}' data-link>${listeReciepe}</a></li>`;

    });
    listPosts += "</ul>";

    return `<h1>Posts</h1>` + listPosts+
    "<br>" +
    "<a href='/Dashboard' data-link>Retourner</a>";
    
  }
}
