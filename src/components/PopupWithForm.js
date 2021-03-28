import Popup from './Popup'

export default class PopupWithForm extends Popup{
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector)
    this._submitHandler = submitHandler
    this._submitHandler = this._submitHandler.bind(this)
    this._form = this._popup.querySelector('.form')
    this._inputs = this._form.querySelectorAll('.form__input')
    this._data = {}
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
}