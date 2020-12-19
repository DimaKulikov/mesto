// profile DOM elements
const profile = document.querySelector('.profile')
const popupShowBtn = profile.querySelector('.profile__edit-btn');
const profileName = profile.querySelector('.profile__name');
const subtitle = profile.querySelector('.profile__subtitle');

// popup DOM elements
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const popupSaveBtn = popup.querySelector('.popup__save-btn');
const nameField = popup.querySelector('.popup__input_type_name');
const subtitleField = popup.querySelector('.popup__input_type_subtitle');

function showPopup() {
  popup.classList.add('popup_opened'); // show popup block

  nameField.value = profileName.textContent;   // fill the input fields with current name and title
  subtitleField.value = subtitle.textContent;  //
  nameField.focus();
  document.addEventListener('keydown', keyListener); // listen to keypresses 
}

// listen to esc and enter keypresses to close the popup, remove the listener when enter or esc are pressed
function keyListener(event) {
  if (event.key === 'Escape') {
    closePopup();
    document.removeEventListener('keydown', keyListener);
  }
  if (event.key === 'Enter') {
    updateProfile();
    document.removeEventListener('keydown', keyListener);
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function updateProfile() {
  profileName.textContent = nameField.value;  // update profile name and subtitle text
  subtitle.textContent = subtitleField.value; //
  closePopup();
}

popupShowBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupSaveBtn.addEventListener('click', updateProfile);