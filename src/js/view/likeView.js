import { elements } from "./base";
export const toggleLikeButton = (isLiked) => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = (numberOfLikes) => {
    elements.sectionLikes.style.visibility = numberOfLikes > 0 ? "visible" : "hidden";
}

export const renderLike = (like) => {
    const html = `<li>
                    <a class="likes__link" href="#${like.id}">
                        <figure class="likes__fig">
                            <img src="${like.image_url}" alt="Test">
                        </figure>
                        <div class="likes__data">
                            <h4 class="likes__name">${like.title}</h4>
                            <p class="likes__author">${like.publisher}</p>
                        </div>
                    </a>
                </li>`;
    elements.likesList.insertAdjacentHTML("beforeend", html);
}

export const deleteLike = (id) => {
    const el = document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
}