import Popup from '../components/Popup'

export default class PopupWithConfirm extends Popup {
  constructor({popupSelector}){
    super(popupSelector)
    this._form = this._popup.querySelector('.form')
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
}