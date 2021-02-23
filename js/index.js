import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js'
import { options } from './data.js'

// popups
const popups = document.querySelectorAll('.popup')

// profile elements
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const subtitle = profile.querySelector('.profile__subtitle');

// profile edit popup elements
const profileEditBtn = document.querySelector('.profile__edit-btn');
const profileEditPopup = document.querySelector('.popup_profile-edit');
const profileEditForm = profileEditPopup.querySelector('form[name=profileEditForm]');
const profileNameInput = profileEditPopup.querySelector('input[name=profileNameInput]');
const profileSubtitleInput = profileEditPopup.querySelector('input[name=profileSubtitleInput]');

// place add popup elements
const placeAddBtn = document.querySelector('.profile__add-btn');
const placeAddPopup = document.querySelector('.popup_place-add');
const placeAddForm = placeAddPopup.querySelector('form[name=placeAddForm]');
const placeNameInput = placeAddPopup.querySelector('input[name=placeNameInput]');
const placeImageInput = placeAddPopup.querySelector('input[name=placeImageInput]');

//image popup elements
const imagePopup = document.querySelector('.popup_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupSubtitle = imagePopup.querySelector('.popup__subtitle');


function openPopup(popup) {
  popup.classList.add('popup_opened');  
  document.addEventListener('keydown', listenToEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', listenToEsc);  
}

// Single popups
function showProfileEditPopup() {
  openPopup(profileEditPopup);
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = subtitle.textContent;  
  profileNameInput.focus();  
}

function showPlaceAddPopup() {
  openPopup(placeAddPopup);
}


function showImagePopup (name,link) {
  openPopup(imagePopup);
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupSubtitle.textContent = name;
}

// Submit listeners
profileEditForm.addEventListener('submit', function submitProfileEditForm(evt) {
  profileName.textContent = profileNameInput.value;
  subtitle.textContent = profileSubtitleInput.value;
  closePopup(profileEditPopup);
});

placeAddForm.addEventListener('submit', function submitPlaceAddForm(evt) {
  const newCard = new Card(placeNameInput.value, placeImageInput.value, '#card-template')
  document.querySelector('.cards__list').prepend(newCard.createCard())
  placeNameInput.value = '';
  placeImageInput.value = '';
  closePopup(placeAddPopup);
});

// Click listeners
profileEditBtn.addEventListener('click', showProfileEditPopup);
placeAddBtn.addEventListener('click', showPlaceAddPopup);
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-btn')) {
      closePopup(popup)
    }
  })
})

// Key listeners
function listenToEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Form Validator
const formList = Array.from(document.querySelectorAll('.form'));
formList.forEach((form) => {
  form.addEventListener('submit', (e) => e.preventDefault());
  const validator = new FormValidator(options, form);
  validator.enableValidation()
});

export {showImagePopup}