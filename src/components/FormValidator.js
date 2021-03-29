/**
 * Class enabling live form validation 
 */

export default class FormValidator {
  /**
   * Creates a validator instance
   * @param {object} selectors object containing css selectors for all the necessary elements
   * @param {*} formElement <form> element to be validated
   */
  constructor(selectors, formElement) {
    this._form = formElement
    this._selectors = selectors
  }

  /**
   * Shows an error message corresponding to the input field currently being edited
   */
  _showInputError() {
    this._currentInput.classList.add(this._selectors.inputErrorClass);
    this._errorContainer.textContent = this._errorMessage;
    this._errorContainer.classList.add(this._selectors.errorClass);
  }

  /**
   * Hides the error message once the corresponding input field is filled with valid data
   */  
  _hideInputError() {
    this._currentInput.classList.remove(this._selectors.inputErrorClass);
    this._errorContainer.classList.remove(this._selectors.errorClass);
    this._errorContainer.textContent = '';
  }

  /**
   * Checks if the currently edited input is valid. Shows or hides the input error accordingly
   */
  _isValid() {
    if (!this._currentInput.validity.valid) {
      this._errorMessage = this._currentInput.validationMessage;
      this._showInputError()
    } else {
      this._hideInputError();
    }
  }

  /**
   * Checks all input fields in the form
   * @returns {boolean} 'true' if any of the input fields is invalid, otherwise 'false'
   */
  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  };

  /**
   * Adds or removes 'disabled' attribute and class modifier on the form's submit button 
   */
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._button.classList.add(this._selectors.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._selectors.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  /**
   * Callback function for input events on any of the input fields
   * @param {Event} e 
   */
  _inputChangeHandler(e) {
    this._currentInput = e.target
    this._errorContainer = this._form.querySelector(`.${this._currentInput.id}-error`);
    this._isValid();
    this._toggleButtonState();
  }

  /**
   * Callback function for submission of the form
   * @param {Event} e 
   */
  _submitHandler(e) {
    e.preventDefault();
  }

  /**
   * Sets 'input','submit' and 'reset' event listeners in the process of initialising the validator
   */
  _setEventListeners() {    
    this._inputList.forEach(input => {
      input.addEventListener('input', (e) => { this._inputChangeHandler(e) });
    })
    this._form.addEventListener('submit', (e) => { this._submitHandler(e) });
    this._form.addEventListener('reset', () => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._currentInput = inputElement;
        this._errorContainer = this._form.querySelector(`.${this._currentInput.id}-error`);
        this._hideInputError()
      })
    })

  }

  /**
   * Gets form DOM elements and saves them as class instance properties
   */
  _getElements() {
    this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
    this._button = this._form.querySelector(this._selectors.submitButtonSelector);
  }

  /**
   * Public method to initialise the validator
   */
  enableValidation() {
    this._getElements()
    this._setEventListeners()
  }
}
