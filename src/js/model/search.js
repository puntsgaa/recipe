import axios from 'axios';
export default class Search {
    constructor(query) {
        this.query = query;
    }

    doSearch = async () => {
        try {
            const res = await axios('https://forkify-api.herokuapp.com/api/search?q=' + this.query);
            this.result = res.data.recipes;
            return this.result;
        }
        catch (error) {
            alert(error);
        }
    }
}