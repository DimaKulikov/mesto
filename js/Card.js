import { initialCards } from './data.js';
import { showImagePopup } from './index.js'

class Card {
  constructor(name, url, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._url = url;
    this._isLiked = false;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content
    const element = template.cloneNode(true).children[0]
    return element;
  }

  _handleLike() {
    this._isLiked = !this._isLiked
    this._likeBtn.classList.toggle('card__like-btn_active')
  }

  _handleRemove() {
    this._element.remove()
    this._element = null;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLike()
    })

    this._removeBtn.addEventListener('click', () => {
      this._handleRemove();
    })

    this._image.addEventListener('click', () => {
      showImagePopup(this._name,this._url)
    })
  }

  _getElements() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__pic');
    this._title = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like-btn');
    this._removeBtn = this._element.querySelector('.card__remove-btn');
  }

  createCard() {  
    this._getElements()
    this._image.src = this._url;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._setEventListeners()
    return this._element
  }
}

initialCards.forEach(card => {
  const newCard = new Card(card.name, card.link, '#card-template')
  document.querySelector('.cards__list').prepend(newCard.createCard())
})

export { Card };