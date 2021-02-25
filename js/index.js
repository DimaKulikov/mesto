import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './data.js'
import { validatorOptions, elements } from './constants.js'
import { closePopup, showImagePopup, showPlaceAddPopup, showProfileEditPopup } from './utils.js'


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

// Submit listeners
elements.profileEditForm.addEventListener('submit', function submitProfileEditForm(evt) {
  elements.profileName.textContent = elements.profileNameInput.value
  elements.subtitle.textContent = elements.profileSubtitleInput.value
  closePopup(elements.profileEditPopup)
})

placeAddForm.addEventListener('submit', function submitPlaceAddForm(evt) {
  const newCard = new Card(elements.placeNameInput.value, elements.placeImageInput.value, '#card-template', showImagePopup)
  elements.cardsContainer.prepend(newCard.createCard())
  elements.placeNameInput.value = ''
  elements.placeImageInput.value = ''
  // fire an input event to update submit button state
  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  })
  elements.placeNameInput.dispatchEvent(event)
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


