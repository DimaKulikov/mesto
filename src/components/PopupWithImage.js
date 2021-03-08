/**
 * @requires Popup
 */
import Popup from './Popup'

/**
 * Represents a popup with an image
 * @extends Popup
 */
export default class PopupWithImage extends Popup{
  /**
   * Creates a popup instance
   * @param {string} popupSelector css selector for the popup container
   */
  constructor(popupSelector){
    super(popupSelector)
    this._image = this._popup.querySelector('.popup__image')
    this._subtitle = this._popup.querySelector('.popup__subtitle')
    
  }

  /**
   * Extends the parent's method to display a picture in the popup
   * @param {object} param0 object containing data to be displated in the popup . Must contain "name" and "link" keys
   */
  open({name, link}){
    super.open()
    this._image.src = link 
    this._subtitle.textContent = name 
  }
}