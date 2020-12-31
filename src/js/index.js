require("@babel/polyfill");
import Search from "./model/Search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import { renderRecipe, clearRecipe, activeRecipe } from "./view/recipeView";
import List from "./model/list";
import * as listView from "./view/listView";
import Like from "./model/like";
import * as likesView from "./view/likeView";
const state = {};
const controlSearch = async () => {
    console.log("controlSearch");
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearSearch();
        searchView.clearSearchResult();
        renderLoader(elements.searchResultDiv);
        await state.search.doSearch();
        clearLoader();
        if (state.search.result === undefined) alert("Хайлт илэрцгүй");
        else searchView.renderRecipes(state.search.result);
    }
    else {
        alert("Утга оруулна уу.");
    }
}
elements.searchForm.addEventListener("submit", e => {
    e.preventDefault();
    controlSearch();
});


const controlRecipe = async () => {
    const id = window.location.hash.replace("#", "");
    if (id) {
        state.recipe = new Recipe(id);
        clearRecipe();
        renderLoader(elements.recipeDiv);
        activeRecipe(id);
        await state.recipe.getRecipe();
        clearLoader();
        state.recipe.calcTime();
        state.recipe.calcPersons();
        renderRecipe(state.recipe, state.likes.isLike(id));
    }
}

const arr = ["load", "hashchange"];
arr.forEach(event => {
    window.addEventListener(event, controlRecipe);
});

window.addEventListener("load", e => {
    if (!state.likes) {
        state.likes = new Like();
        likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
        state.likes.likes.forEach(el => {
            likesView.renderLike(el);
        })
    }
})

const controlList = () => {
    state.list = new List();
    listView.clearItems();
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el);
        listView.renderItem(item);
    })
}

const controlLike = () => {
    if (!state.likes) {
        state.likes = new Like();
    }
    const currentRecipeId = state.recipe.id;
    if (state.likes.isLike(currentRecipeId)) {
        state.likes.deleteLike(currentRecipeId);
        likesView.toggleLikeButton(false);
        likesView.deleteLike(currentRecipeId);
    } else {
        const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image_url);
        likesView.renderLike(newLike);
        likesView.toggleLikeButton(true);
    }
    likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
}

elements.recipeDiv.addEventListener("click", e => {
    if (e.target.matches('.add__to , .add__to *')) {
        controlList();
    }
    else if (e.target.matches('.recipe__love , .recipe__love *')) {
        controlLike();
    }
});
elements.shoppingList.addEventListener("click", event => {
    const id = event.target.closest(".shopping__item").dataset.itemid;
    state.list.removeItem(id);
    listView.deleteItem(id);
})