/**
 * @requires Popup
 */

import Popup from './Popup'

/**
 * Represents a popup with a form
 * @extends Popup
 */
export default class PopupWithForm extends Popup{
  /**
   * Creates a popup instance
   * @param {string} popupSelector css selector for the popup
   * @param {string} submitHandler a callback function to handle submission of the form
   */
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector)
    this._submitHandler = submitHandler
    this._submitHandler = this._submitHandler.bind(this)
    this._form = this._popup.querySelector('.form')
    this._inputs = this._form.querySelectorAll('.form__input')
    this._data = {}
  }

  /**
   * Extends the parent's open method to reset the form
   */
  close(){
    super.close()
    this._form.reset()
  }

  /**
   * Creates an object containing the data from the input fields
   * @returns {object} 
   */
  getInputValues(){    
    this._inputs.forEach((input) => this._data[input.name] = input.value)
    return this._data

  }

  /**
   * Sets click listeners with a parent method, adds a submit listener
   */
  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', this._submitHandler)
  }

  /**
   * Fills in input fields' values with the passed data
   * @param {object} data object containing data to insert into input fields. It's keys must correspond to input elements' "name" attributes
   */
  setInputValues(data){
    this._inputs.forEach(input => {
      input.value = data[input.name]
    })
  }
}