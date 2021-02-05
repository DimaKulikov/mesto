// document.addEventListener('click', (e) => {
//   console.log(e.target)
// })

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
const profileName = profile.querySelector('.profile__name');
const subtitle = profile.querySelector('.profile__subtitle');

//cards elements
const cardsList = document.querySelector('.cards__list');
const template = document.querySelector('#card-template').content;

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

//popup close buttons
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');

// render hardcoded cards on page load
initialCards.forEach(el => {
  renderCard(el.name, el.link);
});

// Functions 
// Cards
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
  cardPicture.addEventListener('click', () => {
    showImagePopup(name, link);
  });
  return newCard;
}

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-btn_active');
}

function removeCard (evt) {
  evt.target.parentNode.classList.add('card_removed');
  setTimeout(()=>{
    evt.target.parentNode.remove();
  }, settings.cardFadeOutDuration);  
}

// Universal popup
function openPopup(popup) {
  const closeBtn = popup.querySelector('.popup__close-btn');
  popup.classList.add('popup_opened');  
  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target === closeBtn) {
      closePopup(popup);
    }
  })
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
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  subtitle.textContent = profileSubtitleInput.value;
  closePopup(profileEditPopup);
});

placeAddForm.addEventListener('submit', function submitPlaceAddForm(evt) {
  evt.preventDefault();
  renderCard(placeNameInput.value, placeImageInput.value)
  placeNameInput.value = '';
  placeImageInput.value = '';
  closePopup(placeAddPopup);
});

// Click listeners
profileEditBtn.addEventListener('click', showProfileEditPopup);
placeAddBtn.addEventListener('click', showPlaceAddPopup);

// popupCloseBtns.forEach(btn => {
//   btn.addEventListener('click', () => {    
//     const openedPopup = btn.closest('.popup');
//     closePopup(openedPopup);
//   })
// });

// Key listeners
function listenToEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

