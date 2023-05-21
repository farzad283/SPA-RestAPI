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

    const fileList = await getData('/jsonfiles'); // Remplacer par l'adresse de mon serveur
    console.log(fileList);

    const listPostsPromises = fileList.map(async (listeReciepe) => {
      console.log(listeReciepe);
      const data = await getData(`/static/js/views/JSON-data/${listeReciepe}.json`);
      console.log(data.results);

      const imageUrls = data.results.map((item) => item.image);
      const titles = data.results.map((item) => item.title); 

      console.log(imageUrls);
      console.log(titles);

      return imageUrls.map((imageUrl, index) => {
        return `<div class='gallery_info'>
            <h5>${titles[index]}</h5>
          <img class='gallery_image' src='${imageUrl}' alt=''>
        </div>`;
      });
    });

    const listPosts = (await Promise.all(listPostsPromises)).flat().join('');

    return `<h1>Aliments Galerie</h1><div class='gallery'>${listPosts}</div>` +
      "<br>" +
      "<a href='/Dashboard' data-link>Retourner</a>";
  }
}
