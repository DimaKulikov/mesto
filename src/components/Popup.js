/**
 * Class representing a popup modal
 */
export default class Popup {
  /**
   * Create a popup instance
   * @param {string} popupSelector css selector for the popup container
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
    this._closeBtn = this._popup.querySelector('.popup__close-btn')
    this._handleEscClose = this._handleEscClose.bind(this)
  }
  /**
   * Keydown event handler. Closes the popup
   * @private
   * @param {Event} evt 
   */
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close()      
    }
  }

  /**
   * Sets click listeners to close the popup
   */
  setEventListeners(){
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
        this.close()
      }
    })   
  }

  /**
   * Opens the popup, adds keydown listener to enable closing with 'esc' key
   */
  open(){
    this._popup.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  /**
   * Closes the popup, removes keydown event listener
   */
  close(){
    this._popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }
}