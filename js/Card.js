import { initialCards } from './data.js';

class Card {
  constructor(name, link, templateSelector) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._isLiked = false;
    this._element;
    this._cardPicture;
    this._cardTitle;
    this._likeBtn;
    this._removeBtn;
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
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLike()
    })

    this._removeBtn.addEventListener('click', () => {
      this._handleRemove();
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardPicture = this._element.querySelector('.card__pic');
    this._cardTitle = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like-btn');
    this._removeBtn = this._element.querySelector('.card__remove-btn');
    this._cardPicture.src = this._link;
    this._cardPicture.alt = this._name;
    this._cardTitle.textContent = this._name;
    return this._element;
  }
}

initialCards.forEach(card => {
  const newCard = new Card(card.name, card.link, '#card-template')
  const newCardElement = newCard.createCard();
  newCard._setEventListeners();
  document.querySelector('.cards__list').prepend(newCardElement)
})

export { Card };