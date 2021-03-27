/**
 * Import components
 */
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import UserInfo from '../components/UserInfo'
import Api from '../components/Api'

/**
 * Import constants
 */
import { initialCards } from '../utils/data.js'
import { validatorOptions } from '../utils/constants.js'

/**
 * Import CSS
 */

import '../pages/index.css'
import '../dev.css'

/**
 * Get the necessary DOM elements
 */
const profileEditBtn = document.querySelector('.profile__edit-btn')
const profileEditForm = document.querySelector('form[name=profileEditForm]')
const placeAddBtn = document.querySelector('.profile__add-btn')
const placeAddForm = document.querySelector('form[name=placeAddForm]')

/**
 * Form validators
 */
const profileEditValidator = new FormValidator(validatorOptions, profileEditForm)
const placeAddValidator = new FormValidator(validatorOptions, placeAddForm)
profileEditValidator.enableValidation()
placeAddValidator.enableValidation()




/**
 * API
 */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21', 
  headers: {
    authorization: 'a6be0e39-3b40-440d-b51a-2e6c0105cc3c'
  }})

 

/**
 * User information
 */
const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__subtitle',
})

api.getUserInfo()
  .then(userData => {
    userInfo.updateUserData(userData)
  })




/**
 * List of cards
 */
const cardsList = new Section({
  data: [], 
  renderer: (data) => {
    const card = new Card({
      data,
      templateSelector: '#card-template',   
      clickHandler: () => imagePopup.open(data),
      deleteIconClickHandler: (cardId) => api.deleteCard(cardId)
    }) 
    const cardElement = card.createCard()   
    cardsList.addItem(cardElement)
  },
  containerSelector: '.cards__list'
})
/** 
 * Getting cards from the server
*/
api.getInitialCards()
  .then(data=> {    
    cardsList.renderItems(data.reverse())
  })
  .catch(err => {
    console.error('Ошибка при загрузке карточек:', err);
  });




/**
 * 
 * Popups
 * 
 */

/**
 * Profile editing popup
 */
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  submitHandler: () => {
    api.updateUserInfo(profilePopup.getInputValues())
      .then(data => {
        userInfo.updateUserData(data)        
        profilePopup.close()
      })
  }
})
profilePopup.setEventListeners()


/**
 * Image popup
 */
const imagePopup = new PopupWithImage('.popup_image')
imagePopup.setEventListeners()

/**
 * Place add popup
 */
const placePopup = new PopupWithForm({
  popupSelector: '.popup_place-add',
  submitHandler: () => {
    const cardData = placePopup.getInputValues()
    api.addCard(cardData)
      .then((res) => {
        console.log(res)
        const card = new Card({
          data: res,
          templateSelector: '#card-template',
          clickHandler: () => imagePopup.open(res),
          deleteIconClickHandler: (cardId) => api.deleteCard(cardId)
        })
        const cardElement = card.createCard()
        cardsList.addItem(cardElement)
        placePopup.close()
      })
    
  }
})
placePopup.setEventListeners()



/**
 * Event listeners for static elements
 */

profileEditBtn.addEventListener('click', () => {
  profilePopup.open()
  profilePopup.setInputValues(userInfo.getUserInfo())
})


placeAddBtn.addEventListener('click', () => {
  placeAddValidator.toggleButtonState()
  placePopup.open()
})


