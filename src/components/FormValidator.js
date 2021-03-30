export default class FormValidator {
  constructor(selectors, formElement) {
    this._form = formElement
    this._selectors = selectors
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._selectors.inputErrorClass);
    const errorContainer = this._form.querySelector(`.${inputElement.id}-error`);
    errorContainer.textContent = errorMessage;
    errorContainer.classList.add(this._selectors.errorClass);
  }

  _hideInputError(inputElement) {
    const errorContainer = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorContainer.classList.remove(this._selectors.errorClass);
    errorContainer.textContent = '';
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorMessage)
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  };


  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._selectors.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._selectors.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _inputChangeHandler(evt) {
    const input = evt.target
    this._errorContainer = this._form.querySelector(`.${input.id}-error`);
    this._isValid(input);
    this._toggleButtonState();
  }

  _submitHandler(evt) {
    evt.preventDefault();
  }

  _setEventListeners() {    
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', (e) => { this._inputChangeHandler(e) });
    })
    this._form.addEventListener('submit', (e) => { this._submitHandler(e) });
    this._form.addEventListener('reset', () => {
      setTimeout(() => {
      this._toggleButtonState();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement)
      })
      }, 0)
    })
  }

  _getElements() {
    this._inputList = Array.from(this._form.querySelectorAll(this._selectors.inputSelector));
    this._button = this._form.querySelector(this._selectors.submitButtonSelector);
  }

  enableValidation() {
    this._getElements()
    this._setEventListeners()
  }
}
