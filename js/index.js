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
  fadeOutDuration: 300,  
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

// popup elements
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const profileEditForm = popup.querySelector('form[name=profileEditForm]');
const profileNameInput = profileEditForm.querySelector('input[name=profileNameInput]');
const profileSubtitleInput = profileEditForm.querySelector('input[name=profileSubtitleInput]');
const placeAddForm = popup.querySelector('form[name=placeAddForm]');
const placeNameInput = placeAddForm.querySelector('input[name=placeNameInput]');
const placeImageInput = placeAddForm.querySelector('input[name=placeImageInput]');

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
  cardsList.prepend(newCard);
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

function showPopup(evt) {
  if (evt.target === prfileEditBtn){
    showProfileEditForm();
  }
  if (evt.target === palceAddBtn) {
    showPlaceAddForm();
  }
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', listenToEsc); 

  function showProfileEditForm() {
    profileEditForm.classList.add('popup__form_shown');
    profileNameInput.value = profileName.textContent;
    profileSubtitleInput.value = subtitle.textContent;  
    profileNameInput.focus();
  }  
  function showPlaceAddForm() {
    placeAddForm.classList.add('popup__form_shown');
  }
}

function listenToEsc(event) {
  if (event.key === 'Escape') {
    closePopup();
    document.removeEventListener('keydown', listenToEsc);
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
  setTimeout(() => {
    profileEditForm.classList.remove('popup__form_shown');
    placeAddForm.classList.remove('popup__form_shown');
  }, settings.fadeOutDuration);
 
}

function submitProfileEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  subtitle.textContent = profileSubtitleInput.value;
  closePopup();
}

function submitPlaceAddForm(evt) {
  evt.preventDefault();
  renderCard(placeNameInput.value, placeImageInput.value)
  closePopup();
}

function removeCard (evt) {
  evt.target.parentNode.classList.add('card_removed');
  setTimeout(()=>{
    evt.target.parentNode.remove();
  }, settings.fadeOutDuration);  
}

function showLightbox (evt) {
  const sourceTitle = evt.target.parentNode.querySelector('.card__title').textContent;  
  const previousImage = lightbox.querySelector('.lightbox__image');
  const lightboxImage = document.createElement('img');
  lightboxImage.classList.add('lightbox__image');
  lightboxImage.src = evt.target.src;
  lightboxImage.alt = sourceTitle;
  lightboxSubtitle.textContent = sourceTitle;
  if(previousImage) {
    previousImage.remove();
  }
  lightboxContainer.append(lightboxImage);
  lightbox.classList.add('lightbox_opened');
  closeBtn.addEventListener('click', closeLightbox);
}

function closeLightbox() {
  lightbox.classList.remove('lightbox_opened');
}

// Event listeners
prfileEditBtn.addEventListener('click', showPopup);
palceAddBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
profileEditForm.addEventListener('submit', submitProfileEditForm);
placeAddForm.addEventListener('submit', submitPlaceAddForm);
