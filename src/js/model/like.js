export default class Like {
    constructor() {
        this.readDataLocalStorage();
        if (!this.likes) {
            this.likes = []
        }
    }

    addLike = (id, title, publisher, img) => {
        const like = {
            id: id,
            title: title,
            publisher: publisher,
            img: img
        }
        this.likes.push(like);
        this.saveDataLocalStorage();
        return like;
    }

    deleteLike = (id) => {
        const index = this.likes.findIndex(el => {
            el.id === id;
        })
        this.likes.splice(index, 1);
        this.saveDataLocalStorage();
    }

    isLike = (id) => {
        if (this.likes.findIndex(el => el.id === id) === -1) {
            return false;
        }
        else {
            return true;
        }
    }

    getNumberOfLikes = () => {
        return this.likes.length;
    }

    saveDataLocalStorage = () => {
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }

    readDataLocalStorage = () => {
        this.likes = JSON.parse(localStorage.getItem("likes"));
    }
}