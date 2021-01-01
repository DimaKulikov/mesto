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
  fadeOutDuration: 500,  
}

// profile elements
let profile = document.querySelector('.profile'),
  prfileEditBtn = profile.querySelector('.profile__edit-btn'),
  palceAddBtn = profile.querySelector('.profile__add-btn'),
  profileName = profile.querySelector('.profile__name'),
  subtitle = profile.querySelector('.profile__subtitle');

//list of cards elements
const cardsList = document.querySelector('.cards__list'),
  template = document.querySelector('#card-template').content;

// popup elements
const popup = document.querySelector('.popup'),
  popupCloseBtn = popup.querySelector('.popup__close-btn');
const profileEditForm = popup.querySelector('form[name=profileEditForm]'),
  profileNameInput = profileEditForm.querySelector('input[name=profileNameInput]'),
  profileSubtitleInput = profileEditForm.querySelector('input[name=profileSubtitleInput]');
const placeAddForm = popup.querySelector('form[name=placeAddForm]'),
  placeNameInput = placeAddForm.querySelector('input[name=placeNameInput]'),
  placeImageInput = placeAddForm.querySelector('input[name=placeImageInput]');

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
  cardsList.prepend(newCard)
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
  popup.classList.add('popup_opened'); // show popup block
  document.addEventListener('keydown', keyListener); 

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

function keyListener(event) {
  if (event.key === 'Escape') {
    closePopup();
    document.removeEventListener('keydown', keyListener);
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
  setTimeout(() => {
    profileEditForm.classList.remove('popup__form_shown');
    placeAddForm.classList.remove('popup__form_shown');
  }, settings.fadeOutDuration)
 
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
  evt.target.parentNode.remove();
}

// Event listeners
prfileEditBtn.addEventListener('click', showPopup);
palceAddBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
profileEditForm.addEventListener('submit', submitProfileEditForm);
placeAddForm.addEventListener('submit', submitPlaceAddForm);
