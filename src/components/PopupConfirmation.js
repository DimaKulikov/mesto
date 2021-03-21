import PopupWithForm from './PopupWithForm'

export default class PopupConfirmation extends PopupWithForm {
  constructor({ popupSelector, submitHandler }) {
    super({ popupSelector, submitHandler })
  }
  removeCard(cardId) {
    this._cardId = cardId
  }

}