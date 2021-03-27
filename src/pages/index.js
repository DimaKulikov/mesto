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
 * Create form validator instances and enable them
 */
const profileEditValidator = new FormValidator(validatorOptions, profileEditForm)
const placeAddValidator = new FormValidator(validatorOptions, placeAddForm)
profileEditValidator.enableValidation()
placeAddValidator.enableValidation()




/**
 *
 * API
 *
 */

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'a6be0e39-3b40-440d-b51a-2e6c0105cc3c',
    'Content-Type': 'application/json'
  }
});

api.getInitialCards().then(data => console.log('rendering ', data))




/**
 *
 * User Information
 *
 */
const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__subtitle'
})


/**
 * Create a section containing the list of cards (pictures of places)
 */
const cardsList = new Section({

  initData: initialCards,
  /**
   * Passing in a renderer callback function to render each element in this section. The elements are instances of the Card class
   * @param {object} data An object with the data for a card. Must contain 'name' and 'link' properties
   */
  renderer: () => {
    const data = api.getInitialCards()
    console.log(data)
    const card = new Card({
      data, 
      templateSelector: '#card-template',

      // Each card gets a callback click handler to display an image popup for the card's image      
      clickHandler: () => imagePopup.open(data),
      deleteHandler: () => confirmRemovePopup.open()
    })

    // Create a DOM element from the Card instance    
    const cardElement = card.createCard()

    // Insert the element into the section container     
    cardsList.addItem(cardElement)
  },
  containerSelector: '.cards__list'
})

console.log(cardsList)

// Render the initial cards passed in to the section's constructor as the 'data' parameter
cardsList.renderItems();


/**
 *
 * Popups
 *
 */
/**
 * Creating an instance of a PopupWithForm for the profile editing popup. 
 * Passing in a callback function for the form's submit handler, which updates user information on the page via the UserInfo instance
 */
const profilePopup = new PopupWithForm({
  popupSelector: '.popup_profile-edit',
  submitHandler: () => {
  // Update user info on the page
  userInfo.setUserInfo(profilePopup.getInputValues())
  // Close the popup after submit
  profilePopup.close()
  }
})
// Set click and submit listeners
profilePopup.setEventListeners()


/**
 * Create an image popup 
 */
const imagePopup = new PopupWithImage('.popup_image')
imagePopup.setEventListeners()

/**
 * Create an instance of a PopupWithForm for the place addition popup
 */
const placePopup = new PopupWithForm({
  popupSelector: '.popup_place-add',
  submitHandler: () => {
    const data = placePopup.getInputValues()
    const card = new Card({
      data,
      templateSelector: '#card-template',
      clickHandler: () => imagePopup.open(data)
    })
    const cardElement = card.createCard()
    cardsList.addItem(cardElement)
    placePopup.close()
  }
})
placePopup.setEventListeners()

/**
 * Popup confirmation on deleting a card
 */
const confirmRemovePopup = new PopupWithForm({
  popupSelector: '.popup_place-remove',
  submitHandler: (e) => {
    e.preventDefault();
    confirmRemovePopup.close()
    console.log(e)
    //Api.removeCard(cardId) ???
  }
})
// confirmRemovePopup.setEventListeners();
// confirmRemovePopup.open()

/**
 * Event listeners for static elements
 */
// Show profile popup and fill in the input fields with existing user information
profileEditBtn.addEventListener('click', () => {
  profilePopup.open()
  profilePopup.setInputValues(userInfo.getUserInfo())
})

// Show the place additon popup and make sure the submit button state is correct
placeAddBtn.addEventListener('click', () => {
  placeAddValidator.toggleButtonState()
  placePopup.open()
})





