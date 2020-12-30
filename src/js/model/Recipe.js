import axios from 'axios';
export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    getRecipe = async () => {
        const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
        this.publisher = result.data.recipe.publisher;
        this.ingredients = result.data.recipe.ingredients;
        this.source_url = result.data.recipe.source_url;
        this.image_url = result.data.recipe.image_url;
        this.social_rank = result.data.recipe.social_rank;
        this.title = result.data.recipe.title;
    }

    calcTime = () => {
        this.time = this.ingredients.length * 5;
    }

    calcPersons = () => {
        this.persons = 4;
    }
}