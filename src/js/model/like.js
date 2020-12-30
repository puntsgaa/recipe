export default class Like {
    constructor() {
        this.likes = []
    }

    addLike = (id, title, publisher, img) => {
        const like = {
            id: id,
            title: title,
            publisher: publisher,
            img: img
        }
        this.likes.push(like);
        return like;
    }

    deleteLike = (id) => {
        const index = this.likes.findIndex(el => {
            el.id === id;
        })
        this.likes.splice(index, 1);
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
}