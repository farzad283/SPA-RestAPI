import AbstractView from "./AbstractView.js"

export default class extends AbstractView{
    constructor(params) {
        super(params)
        this.setTitle('Settings')
    }

    async getHtml(){
        return `
        <h1>Settings</h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit neque eligendi quasi magnam blanditiis placeat molestiae, quidem exercitationem est quae minima ratione tempore quod itaque ducimus veniam dolore in consequatur?</p>
        <a href="/posts" data-link>Voire Article</a>
        `

    }
}