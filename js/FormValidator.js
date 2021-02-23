class FormValidator {
  constructor(selectors, formElement) {
    this._form = formElement
    this._selectors = selectors
    this._inputChangeHandler = this._inputChangeHandler.bind(this)
  }
  _showInputError() {
    this._lastInput.classList.add(this._selectors.inputErrorClass);
    this._errorContainer.textContent = this._errorMessage;
    this._errorContainer.classList.add(this._selectors.errorClass);
  }
  
  _hideInputError() {
    this._lastInput.classList.remove(this._selectors.inputErrorClass);
    this._errorContainer.classList.remove(this._selectors.errorClass);
    this._errorContainer.textContent = '';
  }

  _isValid() {
    if (!this._lastInput.validity.valid) {
      this._errorMessage = this._lastInput.validationMessage;
      this._showInputError()
    } else {
      this._hideInputError();
    }
  }

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._button.classList.add(this._selectors.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._selectors.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _inputChangeHandler(e) {
    this._lastInput = e.target
    this._errorContainer = this._form.querySelector(`.${this._lastInput.id}-error`);
    this._isValid();
    this._toggleButtonState();
  }

  _setEventListeners() {    
    this._inputList.forEach(input => {
      input.addEventListener('input', this._inputChangeHandler);
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

export {FormValidator}
