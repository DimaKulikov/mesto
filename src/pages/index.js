/**
 * Import components
 */
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section'
import PopupWithImage from '../components/PopupWithImage'
import PopupWithForm from '../components/PopupWithForm'
import UserInfo from '../components/UserInfo'

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
 * Initialise user information component
 */
const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__subtitle'
})


/**
 * Create a section containing the list of cards (pictures of places)
 */
const cardsList = new Section({
  data: initialCards, 
  /**
   * Passing in a renderer callback function to render each element in this section. The elements are instances of the Card class
   * @param {object} data An object with the data for a card. Must contain 'name' and 'link' properties
   */
  renderer: (data) => {
    const card = new Card({
      data, 
      templateSelector: '#card-template', 
      // Each card gets a callback click handler to display an image popup for the card's image      
      clickHandler: () => imagePopup.open(data)
    })
    // Create a DOM element from the Card instance    
    const cardElement = card.createCard()
    // Insert the element into the section container     
    cardsList.addItem(cardElement)
  },
  containerSelector: '.cards__list'
})

// Render the initial cards passed in to the section's constructor as the 'data' parameter
 cardsList.renderItems();


/**
 * Popups
 */
/**
 * Creating an instance of a PopupWithForm for the profile editing popup. 
 * Passing in a callback function for the form's submit handler, which updates user information on the page via the UserInfo instance
 */
const profilePopup = new PopupWithForm('.popup_profile-edit', () => {
  // Update user info on the page
  userInfo.setUserInfo(profilePopup.getInputValues())
  // Close the popup after submit
  profilePopup.close()
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
const placePopup = new PopupWithForm('.popup_place-add', () => {
  const data = placePopup.getInputValues()
  const card = new Card({
    data, 
    templateSelector: '#card-template',
    clickHandler: () => imagePopup.open(data)
  })
  const cardElement = card.createCard()
  cardsList.addItem(cardElement)
  placePopup.close()
})
placePopup.setEventListeners()


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



