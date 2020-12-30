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

// profile elements
let profile = document.querySelector('.profile'),
  popupShowBtn = profile.querySelector('.profile__edit-btn'),
  profileName = profile.querySelector('.profile__name'),
  subtitle = profile.querySelector('.profile__subtitle');

//list of cards elements
const cardsList = document.querySelector('.cards__list'),
  template = document.querySelector('#card-template').content;

// popup elements
const popup = document.querySelector('.popup'),
  popupCloseBtn = popup.querySelector('.popup__close-btn'),
  profileInputForm = popup.querySelector('form[name=profileEditForm]')
  nameField = popup.querySelector('.popup__input_type_name'),
  subtitleField = popup.querySelector('.popup__input_type_subtitle');


// render hardcoded cards on page load
initialCards.forEach(el => {
  renderCard(el);
})


// Functions 
function renderCard(card) {
  const newCard = template.cloneNode(true);
  const cardPicture = newCard.querySelector('.card__pic');
  const cardTitle = newCard.querySelector('.card__title');
  cardPicture.src = card.link;
  cardPicture.alt = card.name;
  cardTitle.textContent = card.name;
  cardsList.append(newCard)
}

function showPopup() {
  popup.classList.add('popup_opened'); // show popup block
  
  // fill the input fields with current name and title
  nameField.value = profileName.textContent;
  subtitleField.value = subtitle.textContent;  
  nameField.focus();
  document.addEventListener('keydown', keyListener); 
}

function keyListener(event) {
  if (event.key === 'Escape') {
    closePopup();
    document.removeEventListener('keydown', keyListener);
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function updateProfile(event) {
  event.preventDefault();
  profileName.textContent = nameField.value;
  subtitle.textContent = subtitleField.value;
  closePopup();
}

// Event listeners
popupShowBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
profileInputForm.addEventListener('submit', updateProfile);
