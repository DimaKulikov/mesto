// popups
const popups = document.querySelectorAll('.popup')

// profile elements
const profile = document.querySelector('.profile')
const profileName = profile.querySelector('.profile__name')
const profileSubtitle = profile.querySelector('.profile__subtitle')

// profile edit popup elements
const profileEditBtn = document.querySelector('.profile__edit-btn')
const profileEditPopup = document.querySelector('.popup_profile-edit')
const profileEditForm = profileEditPopup.querySelector('form[name=profileEditForm]')
const profileNameInput = profileEditForm.querySelector('input[name=profileNameInput]')
const profileSubtitleInput = profileEditForm.querySelector('input[name=profileSubtitleInput]')
const profileEditSubmitBtn = profileEditForm.querySelector('.form__submit')

// place add popup elements
const placeAddBtn = document.querySelector('.profile__add-btn')
const placeAddPopup = document.querySelector('.popup_place-add')
const placeAddForm = placeAddPopup.querySelector('form[name=placeAddForm]')
const placeNameInput = placeAddForm.querySelector('input[name=placeNameInput]')
const placeImageInput = placeAddForm.querySelector('input[name=placeImageInput]')
const placeAddSubmitBtn = placeAddForm.querySelector('.form__submit')

//image popup elements
const imagePopup = document.querySelector('.popup_image')
const imagePopupImage = imagePopup.querySelector('.popup__image')
const imagePopupSubtitle = imagePopup.querySelector('.popup__subtitle')

//cards container
const cardsContainer = document.querySelector('.cards__list')

export {
  popups,
  profile,
  profileName,
  profileSubtitle,
  profileEditBtn,
  profileEditPopup,
  profileEditForm,
  profileNameInput,
  profileSubtitleInput,
  profileEditSubmitBtn,
  placeAddBtn,
  placeAddPopup,
  placeAddForm,
  placeNameInput,
  placeImageInput,
  placeAddSubmitBtn,
  imagePopup,
  imagePopupImage,
  imagePopupSubtitle,
  cardsContainer
}