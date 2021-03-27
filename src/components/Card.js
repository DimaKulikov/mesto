/**
 * Represents a card 
 */
export default class Card {
  constructor({ data, templateSelector, clickHandler, deleteIconClickHandler }) {
    this._templateSelector = templateSelector;
    this._id = data._id;
    this._likes = data.likes;
    this.owner = data.owner
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
    this._imageClickHandler = clickHandler;
    this._deleteIconClickHandler = deleteIconClickHandler
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.cloneNode(true)
    const element = template.querySelector('.card')
    return element
  }

  _handleLike() {
    this._isLiked = !this._isLiked
    this._likeBtn.classList.toggle('card__like-btn_active')
  }

  removeCard() {
    this._element.remove()
    this._element = null;
    this._image = null;
    this._title = null;
    this._likeBtn = null;
    this._removeBtn = null;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLike()
    })
    this._removeBtn.addEventListener('click', () => {
      this._deleteIconClickHandler(this._id)
    })
    this._image.addEventListener('click', () => {
      this._imageClickHandler(this._name, this._link)
    })
  }

  _getElements() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__pic');
    this._title = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like-btn');
    this._removeBtn = this._element.querySelector('.card__remove-btn');
    this._likeCount = this._element.querySelector('.card__like-count');
  }

  createCard() {     
    this._getElements()
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likeCount.textContent = this._likes.length
    this._setEventListeners()
    return this._element
  }
}

