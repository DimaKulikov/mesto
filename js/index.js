// initial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settings = {
  cardFadeOutDuration: 300  
}

// profile elements
const profile = document.querySelector('.profile');
const prfileEditBtn = profile.querySelector('.profile__edit-btn');
const palceAddBtn = profile.querySelector('.profile__add-btn');
const profileName = profile.querySelector('.profile__name');
const subtitle = profile.querySelector('.profile__subtitle');

//cards elements
const cardsList = document.querySelector('.cards__list');
const template = document.querySelector('#card-template').content;

// profile edit popup elements
const profileEditPopup = document.querySelector('.popup_profile-edit');
const profileEditForm = profileEditPopup.querySelector('form[name=profileEditForm]');
const profileNameInput = profileEditPopup.querySelector('input[name=profileNameInput]');
const profileSubtitleInput = profileEditPopup.querySelector('input[name=profileSubtitleInput]');

// place add popup elements
const placeAddPopup = document.querySelector('.popup_place-add');
const placeAddForm = placeAddPopup.querySelector('form[name=placeAddForm]');
const placeNameInput = placeAddPopup.querySelector('input[name=placeNameInput]');
const placeImageInput = placeAddPopup.querySelector('input[name=placeImageInput]');

//image popup elements
const imagePopup = document.querySelector('.popup_image');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupSubtitle = imagePopup.querySelector('.popup__subtitle');

// render hardcoded cards on page load
initialCards.forEach(el => {
  renderCard(el.name, el.link);
});

// Functions 
function renderCard(name,link) {
  const newCard = createCard(name,link);
  cardsList.prepend(newCard);
}

function createCard(name,link){
  const newCard = template.cloneNode(true);
  const cardPicture = newCard.querySelector('.card__pic');
  const cardTitle = newCard.querySelector('.card__title');
  const likeBtn = newCard.querySelector('.card__like-btn');
  const removeBtn = newCard.querySelector('.card__remove-btn');
  cardPicture.src = link;
  cardPicture.alt = name;
  cardTitle.textContent = name;
  likeBtn.addEventListener('click', toggleLike);
  removeBtn.addEventListener('click', removeCard);
  cardPicture.addEventListener('click', showLightbox);
  return newCard;
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

function showProfileEditPopup() {
  openPopup(profileEditPopup);
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = subtitle.textContent;  
  profileNameInput.focus();  
  document.addEventListener('keydown', listenToEsc);
}

function showPlaceAddPopup() {
  openPopup(placeAddPopup);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');  
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');  
}

function submitProfileEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  subtitle.textContent = profileSubtitleInput.value;
  closePopup(profileEditPopup);
}

function submitPlaceAddForm(evt) {
  evt.preventDefault();
  renderCard(placeNameInput.value, placeImageInput.value)
  placeNameInput.value = '';
  placeImageInput.value = '';
  closePopup(placeAddPopup);
}

function removeCard (evt) {
  evt.target.parentNode.classList.add('card_removed');
  setTimeout(()=>{
    evt.target.parentNode.remove();
  }, settings.cardFadeOutDuration);  
}

document.addEventListener('click', function globalClickListener(evt){
  if (evt.target.classList.contains('popup__close-btn')){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
}

  if (evt.target.classList.contains('profile__edit-btn')){
    showProfileEditPopup();
    
}

  if (evt.target.classList.contains('profile__add-btn')){
    showPlaceAddPopup();
  }
})
