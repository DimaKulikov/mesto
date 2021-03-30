/**
 * Import components
 */
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import PopupWithConfirm from '../components/PopupWithConfirm'
import UserInfo from '../components/UserInfo'
import Api from '../components/Api'
import Spinner from '../components/Spinner'

/**
 * Import constants
 */
import { validatorOptions } from '../utils/constants'

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
 * Spinner
 */
const cardSectionSpinner = new Spinner('.cards__spinner', '#spinner')
cardSectionSpinner.init()
cardSectionSpinner.isLoading(true)


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

/**
 * List of cards
 */
const cardsList = new Section({
  initData: [],
  renderer: (cardObject) => {
    const card = makeCard(userInfo.getUserId(), cardObject)
    const cardElement = card.createCard()
    cardsList.addItem(cardElement)
  },
  containerSelector: '.cards__list'
})

/**
 * Get initial cards and user info
 */
Promise.all([api.getInitialCards(), api.getUserInfo()]).then(res => {
  const [cardsArray, userData] = res;
  userInfo.updateUserData(userData)
  cardsList.renderItems(cardsArray.reverse())
}).catch(err => console.error('Ошибка получения карточек и данных пользователя: ', err))
  .finally(() => cardSectionSpinner.isLoading(false))



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
      })
      .catch(err => console.error('Ошибка при обновлении данных пользователя:', err))
      .finally(() => {
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
  submitHandler: placeSubmitHandler
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
        userInfo.updateUserData(resp)
        avatarEdit.close()
      })
      .catch(err => console.error('Ошибка при обновлении аватара: ', err))
      .finally(() => {
        avatarEdit.renderSubmitProgress(false)
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
  placePopup.open()
})


/**
 * Helpers
 */
function makeCard(userId, cardObject) {
  const card = new Card({
    data: cardObject,
    userId: userId,
    templateSelector: '#card-template',
    imageClickHandler: () => imagePopup.open(cardObject),
    deleteIconClickHandler: deleteCardHandler,
    likeClickHandler: cardLikeHandler
  })
  return card
}

function deleteCardHandler(card) {
  deleteConfirmation.setSubmitAction(()=>{
    deleteConfirmation.renderSubmitProgress(true)
    api.deleteCard(card.id).then(()=>{
      card.removeCard()
      deleteConfirmation.close()
    })
      .catch(err => console.error('Ошибка при удалении карточки:', err))
      .finally(() => {
        deleteConfirmation.renderSubmitProgress(false)
      })
  })
  deleteConfirmation.open()     
}

function cardLikeHandler(card){
  const action = card.getIsLiked() ? api.deleteLike : api.putLike
  action(card.id)
    .then((resp) => {
      card.updateLike(resp)
    })
    .catch(err => console.error('Ошибка при обработке лайка:', err))
}

function placeSubmitHandler() {
  const cardData = placePopup.getInputValues()
  placePopup.renderSubmitProgress(true)
  api.addCard(cardData)
    .then((cardObject) => {
      const card = makeCard(userInfo.getUserId(), cardObject)
      const cardElement = card.createCard()
      cardsList.addItem(cardElement)      
      placePopup.close()
    })
    .catch(err => { console.error('Ошибка при добавлении карточки:', err) })
    .finally(() => {
      placePopup.renderSubmitProgress(false)
    })
}
