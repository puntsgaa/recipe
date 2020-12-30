import { elements } from "./base";
export const getInput = () => {
    return elements.searchInput.value;
}
export const renderRecipes = (recipes, currentPage = 1, resPerPage = 5) => {
    const start = (currentPage - 1) * resPerPage;
    const end = currentPage * resPerPage;
    recipes.slice(start, end).forEach(el => {
        renderRecipe(el);
    })
    const totalPages = Math.round(recipes.length / resPerPage);
    renderButtons(currentPage, totalPages, recipes);
}

const createButton = (page, type, dicertion) => {
    return `<button class="btn-inline results__btn--${type}" id="${type}" data-goto="${page}">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-${dicertion}"></use>
                </svg>
                <span>Хуудас ${page}</span>
            </button>`;
}

const renderButtons = (currentPage, totalPages, recipes) => {
    let button;
    if (currentPage === 1 && totalPages > 1) {
        button = createButton(2, 'next', 'right');
    }
    else if (currentPage < totalPages) {
        button = createButton(currentPage + 1, 'next', 'right');
        button += createButton(currentPage - 1, 'prev', 'left');
    }
    else if (currentPage === totalPages) {
        button = createButton(currentPage - 1, 'prev', 'left');
    }
    elements.pagesButton.insertAdjacentHTML("afterbegin", button);
    if (document.getElementById("next")) {
        document.getElementById("next").addEventListener("click", function () {
            const gotoPageNumber = parseInt(this.dataset.goto);
            clearSearchResult();
            renderRecipes(recipes, gotoPageNumber)
        })
    }
    if (document.getElementById("prev")) {
        document.getElementById("prev").addEventListener("click", function () {
            const backtoPageNumber = parseInt(this.dataset.goto);
            clearSearchResult();
            renderRecipes(recipes, backtoPageNumber)
        })
    }
}

const renderRecipe = (recipe) => {
    let html = `<li>
                <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="Test">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${recipe.title}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>`;
    elements.searchResult.insertAdjacentHTML("beforeend", html);
}

export const clearSearch = () => {
    elements.searchInput.value = "";
}

export const clearSearchResult = () => {
    elements.searchResult.innerHTML = "";
    elements.pagesButton.innerHTML = "";
}