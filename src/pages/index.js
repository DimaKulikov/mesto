import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section'

import { initialCards } from '../utils/data.js'
import { validatorOptions } from '../utils/constants.js'
import * as elements from '../utils/elements.js'
import { openPopup, closePopup } from '../utils/utils.js'


import '../pages/index.css'
import '../dev.css'

// Form Validators
const profileEditValidator = new FormValidator(validatorOptions, elements.profileEditForm)
const placeAddValidator = new FormValidator(validatorOptions, elements.placeAddForm)
profileEditValidator.enableValidation()
placeAddValidator.enableValidation()

// render hardcoded cards
initialCards.forEach(card => {
  const newCard = new Card(card.name, card.link, '#card-template', showImagePopup)
  elements.cardsContainer.prepend(newCard.createCard())
})

//popups
function showProfileEditPopup() {
  openPopup(elements.profileEditPopup);
  elements.profileNameInput.value = elements.profileName.textContent;
  elements.profileSubtitleInput.value = elements.profileSubtitle.textContent;
  // fire input events to update submit button state and error messages
  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  elements.profileNameInput.dispatchEvent(event);
  elements.profileSubtitleInput.dispatchEvent(event);
}

function showPlaceAddPopup() {
  openPopup(elements.placeAddPopup);
} 

function showImagePopup(name, link) {
  openPopup(elements.imagePopup);
  elements.imagePopupImage.src = link;
  elements.imagePopupImage.alt = name;
  elements.imagePopupSubtitle.textContent = name;
}

// Submit listeners
elements.profileEditForm.addEventListener('submit', () => {
  elements.profileName.textContent = elements.profileNameInput.value
  elements.profileSubtitle.textContent = elements.profileSubtitleInput.value
  closePopup(elements.profileEditPopup)
})

placeAddForm.addEventListener('submit', () => {
  const newCard = new Card(elements.placeNameInput.value, elements.placeImageInput.value, '#card-template', showImagePopup)
  elements.cardsContainer.prepend(newCard.createCard())
  elements.placeNameInput.value = ''
  elements.placeImageInput.value = ''
  elements.placeAddSubmitBtn.classList.add(validatorOptions.inactiveButtonClass)
  elements.placeAddSubmitBtn.disabled = true
  closePopup(elements.placeAddPopup)
})

// Click listeners
elements.profileEditBtn.addEventListener('click', showProfileEditPopup)
elements.placeAddBtn.addEventListener('click', showPlaceAddPopup)
elements.popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup)
    }
  })
})


