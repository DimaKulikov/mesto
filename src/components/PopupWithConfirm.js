import Popup from '../components/Popup'

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector,submitButtonSelector, submitProgressText, formSelector}){
    super(popupSelector)
    this._form = this._popup.querySelector(formSelector)
    this._submitButton = this._form.querySelector(submitButtonSelector);
    this._submitButtonDefaultText = this._submitButton.textContent;
    this._submitButtonProgressText = submitProgressText;
    this.submitHandler = ()=>{console.error('Delete handler wasn\'t set' )}
  }

  setEventListeners(){
    super.setEventListeners()
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.submitHandler()
    })
  }  

  setSubmitAction(fn){
    this.submitHandler = fn
  }

  renderSubmitProgress(inProgress) {
    if (inProgress) {
      this._submitButton.textContent = this._submitButtonProgressText
    } else {
      this._submitButton.textContent = this._submitButtonDefaultText
    }
  }
}