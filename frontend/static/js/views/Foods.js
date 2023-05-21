import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
      super(params);
      this.setTitle('Foods');
      this.recipe = params.recipe; 
      console.log("Params: ", params);
      console.log("Recipe: ", this.recipe);
    }

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    const fileList = await getData('/jsonfiles'); //Remplacer par l'adresse de mon serveur
    console.log(fileList);

    let listPosts = "<ul>";
    fileList.forEach(listeReciepe => {
      console.log(listeReciepe);

      listPosts += `<li><a href='/foodsList/${listeReciepe}' data-link>${listeReciepe}</a></li>`;

    });
    listPosts += "</ul>";

    return `<h1>Aliments</h1>` + listPosts+
    "<br>" +
    "<a href='/Dashboard' data-link>Retourner</a>";
    
  }
}
