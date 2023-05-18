import AbstractView from "./AbstractView.js"

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.setTitle('Posts')
    }

//     async getHtml(){

//         async function getData(url){
//             const response = await fetch(url)
//             return response.json()
//         }

//         const data = await getData('/static/js/views/pasta.json')//inja ejraye function balast ba arguman : '/static/js/views/posts.json'
// console.log(data);

//        let listPosts = "<ul>"
//        for(let i in data){
//         console.log(data.results['id']);
//         listPosts +="<li><a href='/post-view/"+data[i]['id']+"' data-link>"+ data.results[i]?.title+"</a></li>"
//        }
//        listPosts += "</ul>"

//         return  `
//         <h1>Posts</h1>
//         ` + listPosts
        

//     }

async getHtml() {
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }
  
    const data = await getData('/static/js/views/pasta.json');
    console.log(data);
  
    let listPosts = "<ul>";
    data.results.forEach(recipe => {
      console.log(recipe.id);
      listPosts += "<li><a href='/post-view/" + recipe.id + "' data-link>" + recipe.title + "</a></li>";
    });
    listPosts += "</ul>";
  
    return `<h1>Posts</h1>` + listPosts;
  }
  
}