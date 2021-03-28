import Popup from './Popup'

export default class PopupWithForm extends Popup{
  constructor({ popupSelector, submitHandler, submitButtonSelector, submitProgressText, formSelector, inputFieldSelector }) {
    super(popupSelector);
    this._submitHandler = submitHandler.bind(this);
    this._form = this._popup.querySelector(formSelector);
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._submitButtonDefaultText = this._submitButton.textContent;
    this._submitButtonProgressText = submitProgressText;
    this._inputs = this._form.querySelectorAll(inputFieldSelector);
    this._data = {};
  }

  close(){
    super.close()
    this._form.reset()
  }

  getInputValues(){    
    this._inputs.forEach((input) => this._data[input.name] = input.value)
    return this._data
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', this._submitHandler)
  }

  setInputValues(data){
    this._inputs.forEach(input => {
      input.value = data[input.name]
    })
  }

  renderSubmitProgress(inProgress) {
    if (inProgress) {
      this._submitButton.textContent = this._submitButtonProgressText
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText
    }
  }
}