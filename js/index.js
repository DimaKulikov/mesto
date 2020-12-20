// profile DOM elements
let profile = document.querySelector('.profile'),
  popupShowBtn = profile.querySelector('.profile__edit-btn'),
  profileName = profile.querySelector('.profile__name'),
  subtitle = profile.querySelector('.profile__subtitle');

// popup DOM elements
let popup = document.querySelector('.popup'),
  popupCloseBtn = popup.querySelector('.popup__close-btn'),
  profileInputForm = popup.querySelector('form[name=profile]')
  nameField = popup.querySelector('.popup__input_type_name'),
  subtitleField = popup.querySelector('.popup__input_type_subtitle');

// like buttons
let likeButtons = document.querySelectorAll('.card__like-btn'); 

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
  // if either of the input fields are empty do the default submit action
  if (nameField.value === '' || subtitleField.value === '') {
    return
  }
  event.preventDefault();
  profileName.textContent = nameField.value;
  subtitle.textContent = subtitleField.value;
  closePopup();
}

function like(event) {
  event.target.classList.toggle('card__like-btn_active');
}

popupShowBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
profileInputForm.addEventListener('submit', updateProfile);
likeButtons.forEach(el => {
  el.addEventListener('click', like);
})