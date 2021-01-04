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
const profileEditPopup = document.querySelector('.popup_form_profile-edit');
const profileEditForm = profileEditPopup.querySelector('form[name=profileEditForm]');
const profileNameInput = profileEditPopup.querySelector('input[name=profileNameInput]');
const profileSubtitleInput = profileEditPopup.querySelector('input[name=profileSubtitleInput]');

// place add popup elements
const placeAddPopup = document.querySelector('.popup_form_place-add');
const placeAddForm = placeAddPopup.querySelector('form[name=placeAddForm]');
const placeNameInput = placeAddPopup.querySelector('input[name=placeNameInput]');
const placeImageInput = placeAddPopup.querySelector('input[name=placeImageInput]');

const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
//lightbox elements
const lightbox = document.querySelector('.lightbox');
const lightboxContainer = lightbox.querySelector('.lightbox__container');
const closeBtn = lightbox.querySelector('.lightbox__close-btn');
const lightboxSubtitle = lightbox.querySelector('.lightbox__subtitle');

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
  profileEditPopup.classList.add('popup_opened'); 
  profileNameInput.value = profileName.textContent;
  profileSubtitleInput.value = subtitle.textContent;  
  profileNameInput.focus();  
  document.addEventListener('keydown', listenToEsc);
}

function showPlaceAddPopup() {
  placeAddPopup.classList.add('popup_opened'); 
  document.addEventListener('keydown', listenToEsc);
}

function listenToEsc(event) {
  if (event.key === 'Escape') {
    closePopup();
    document.removeEventListener('keydown', listenToEsc);
  }
}

function closePopups() {
  profileEditPopup.classList.remove('popup_opened');
  placeAddPopup.classList.remove('popup_opened');
}

function submitProfileEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  subtitle.textContent = profileSubtitleInput.value;
  closePopups();
}

function submitPlaceAddForm(evt) {
  evt.preventDefault();
  renderCard(placeNameInput.value, placeImageInput.value)
  placeNameInput.value = '';
  placeImageInput.value = '';
  closePopups();
}

function removeCard (evt) {
  evt.target.parentNode.classList.add('card_removed');
  setTimeout(()=>{
    evt.target.parentNode.remove();
  }, settings.cardFadeOutDuration);  
}

function showLightbox (evt) {
  const sourceTitle = evt.target.parentNode.querySelector('.card__title').textContent;  
  const lightboxImage = lightbox.querySelector('.lightbox__image');
  lightboxImage.src = evt.target.src;
  lightboxImage.alt = sourceTitle;
  lightboxSubtitle.textContent = sourceTitle;
  lightbox.classList.add('lightbox_opened');
  closeBtn.addEventListener('click', closeLightbox);
}

function closeLightbox() {
  lightbox.classList.remove('lightbox_opened');
}

// Event listeners
prfileEditBtn.addEventListener('click', showProfileEditPopup);
palceAddBtn.addEventListener('click', showPlaceAddPopup);
popupCloseBtns.forEach(btn => btn.addEventListener('click', closePopups));
profileEditForm.addEventListener('submit', submitProfileEditForm);
placeAddForm.addEventListener('submit', submitPlaceAddForm);
