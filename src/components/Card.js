/**
 * Represents a card with an image of a place
 */
export default class Card {
  /**
   * 
   * @param {object} data object containing the data for the card. Must include 'name' and 'link' properties
   * @param {string} templateSelector css selector for the card template
   * @param {function} clickHandler a callback function
   */
  constructor({ data, templateSelector, clickHandler, deleteHandler }) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._isLiked = false;
    this._imageClickHandler = clickHandler;
    this._deleteHandler = deleteHandler.bind(this);
  }

  /**
   * Finds the template in the document and returs a new card element
   */
  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.cloneNode(true)
    const element = template.querySelector('.card')
    return element
  }

  /**
   * Callback function to change like button state
   */
  _handleLike() {
    this._isLiked = !this._isLiked
    this._likeBtn.classList.toggle('card__like-btn_active')
  }

  /**
   * Callback function to remove the card element from the DOM 
   */
  removeCard() {
    this._element.remove()
    this._element = null;
    this._image = null;
    this._title = null;
    this._likeBtn = null;
    this._removeBtn = null;
  }

  /**
   * Sets click handlers 
   */
  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => {
      this._handleLike()
    })

    this._removeBtn.addEventListener('click', () => {
      this._deleteHandler(this)
    })

    this._image.addEventListener('click', () => {
      this._imageClickHandler(this._name, this._link)
    })
  }

  /**
   * Gets the necessary DOM elements and saves them as class instance properties
   */
  _getElements() {
    this._element = this._getTemplate();
    this._image = this._element.querySelector('.card__pic');
    this._title = this._element.querySelector('.card__title');
    this._likeBtn = this._element.querySelector('.card__like-btn');
    this._removeBtn = this._element.querySelector('.card__remove-btn');
  }

  /**
   * Create and return a ready card element
   */
  createCard() {  
    this._getElements()
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._setEventListeners()
    return this._element
  }
}

