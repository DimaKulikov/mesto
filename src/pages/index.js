/**
 * Import components
 */
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import PopupWithConfirm from '../components/PopupWithConfirm'
import UserInfo from '../components/UserInfo'
import Api from '../components/Api'

/**
 * Import constants
 */
import { validatorOptions } from '../utils/constants.js'

/**
 * Import CSS
 */

import '../pages/index.css'
import '../dev.css'

/**
 * DOM elements
 */
const profileEditBtn = document.querySelector('.profile__edit-btn')
const profileEditForm = document.querySelector('form[name=profileEditForm]')
const placeAddBtn = document.querySelector('.profile__add-btn')
const placeAddForm = document.querySelector('form[name=placeAddForm]')
const avatarEditForm = document.querySelector('form[name=avatarEditForm]')

/**
 * Form validators
 */
const profileEditValidator = new FormValidator(validatorOptions, profileEditForm)
const placeAddValidator = new FormValidator(validatorOptions, placeAddForm)
const avatarEditValidator = new FormValidator(validatorOptions, avatarEditForm)
profileEditValidator.enableValidation()
placeAddValidator.enableValidation()
avatarEditValidator.enableValidation()



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
  avatarSelector: '.profile__avatar',
  avatarClickHandler: () => {
    avatarEdit.open()
  }
})
userInfo.setEventListeners()

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
      deleteIconClickHandler: deleteCardHandler,
      likeClickHandler: (card) => {
        const action = card._isLiked ? api.deleteLike : api.putLike
        action(card.id)
          .then((resp) => {
            card.updateLike(resp)
          })
      }
    }) 
    const cardElement = card.createCard()
    if (card.owner._id !== userInfo._userData._id) {
      card.removeDeleteButton()
    }
    if (card._likes.some(likeObj => likeObj._id === userInfo._userData._id)) {
      card.toggleLikeButton()
    }
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
 * Popups
 */

/**
 * Profile editing popup
 */
const profilePopup = new PopupWithForm({
  submitButtonSelector: '.form__submit', 
  submitProgressText: 'Сохранение...', 
  formSelector: '.form', 
  inputFieldSelector: '.form__input',
  popupSelector: '.popup_profile-edit',
  submitHandler: () => {
    profilePopup.renderSubmitProgress(true)
    api.updateUserInfo(profilePopup.getInputValues())
      .then(data => {
        userInfo.updateUserData(data)
        profilePopup.close()
        profilePopup.renderSubmitProgress(false)
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
  submitButtonSelector: '.form__submit', 
  submitProgressText: 'Сохранение...', 
  formSelector: '.form', 
  inputFieldSelector: '.form__input',
  popupSelector: '.popup_place-add',
  submitHandler: () => {
    const cardData = placePopup.getInputValues()
    placePopup.renderSubmitProgress(true)
    api.addCard(cardData)
      .then((data) => {
        const card = new Card({
          data,
          templateSelector: '#card-template',
          clickHandler: () => imagePopup.open(data),
          deleteIconClickHandler: deleteCardHandler,
          likeClickHandler: (card) => {
            let action = card.isLiked ? api.deleteLike : api.putLike
            action(card.id)
              .then((resp) => {
                card.updateLike(resp)
              })
          }
        })
        const cardElement = card.createCard()
        cardsList.addItem(cardElement)
        placePopup.renderSubmitProgress(false)
        placePopup.close()
      })
    
  }
})
placePopup.setEventListeners()

/**
 * Card delete popup
 */
const deleteConfirmation = new PopupWithConfirm({
  popupSelector: '.popup_place-remove',
  submitButtonSelector: '.form__submit', 
  submitProgressText: 'Удаление...', 
  formSelector: '.form'
})
deleteConfirmation.setEventListeners()

/**
 * Avatar edit popup
 */
const avatarEdit = new PopupWithForm({
  submitButtonSelector: '.form__submit', 
  submitProgressText: 'Сохранение...', 
  formSelector: '.form', 
  inputFieldSelector: '.form__input',
  popupSelector: '.popup_avatar-edit',
  submitHandler: () => {
    const formData = avatarEdit.getInputValues()
    avatarEdit.renderSubmitProgress(true)
    api.updateAvatar(formData)
      .then((resp) => {
        console.log(resp)
        userInfo.updateUserData(resp)
        avatarEdit.renderSubmitProgress(false)
        avatarEdit.close()
      })
  }
})
avatarEdit.setEventListeners()


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


/**
 * Helpers
 */

function deleteCardHandler(card) {
  deleteConfirmation.setSubmitAction(()=>{
    deleteConfirmation.renderSubmitProgress(true)
    api.deleteCard(card.id).then(()=>{
      card.removeCard()
      deleteConfirmation.renderSubmitProgress(false)
      deleteConfirmation.close()
    })
  })   
  deleteConfirmation.open()     
}

