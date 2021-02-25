const settings = {
  closePopupButton: 'Escape'
}

const validatorOptions = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
}


// popups
const popups = document.querySelectorAll('.popup')

// profile elements
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__name')
const subtitle = profile.querySelector('.profile__subtitle')

// profile edit popup elements
const profileEditBtn = document.querySelector('.profile__edit-btn')
const profileEditPopup = document.querySelector('.popup_profile-edit')
const profileEditForm = profileEditPopup.querySelector('form[name=profileEditForm]')
const profileNameInput = profileEditPopup.querySelector('input[name=profileNameInput]')
const profileSubtitleInput = profileEditPopup.querySelector('input[name=profileSubtitleInput]')

// place add popup elements
const placeAddBtn = document.querySelector('.profile__add-btn')
const placeAddPopup = document.querySelector('.popup_place-add')
const placeAddForm = placeAddPopup.querySelector('form[name=placeAddForm]')
const placeNameInput = placeAddPopup.querySelector('input[name=placeNameInput]')
const placeImageInput = placeAddPopup.querySelector('input[name=placeImageInput]')

//image popup elements
const imagePopup = document.querySelector('.popup_image')
const imagePopupImage = imagePopup.querySelector('.popup__image')
const imagePopupSubtitle = imagePopup.querySelector('.popup__subtitle')

//cards container
const cardsContainer = document.querySelector('.cards__list')

const elements = {
  popups,
  profile,
  profileName,
  subtitle,
  profileEditBtn,
  profileEditPopup,
  profileEditForm,
  profileNameInput,
  profileSubtitleInput,
  placeAddBtn,
  placeAddPopup,
  placeAddForm,
  placeNameInput,
  placeImageInput,
  imagePopup,
  imagePopupImage,
  imagePopupSubtitle,
  cardsContainer
}

export { settings, validatorOptions, elements }
