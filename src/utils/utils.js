import { settings } from './constants.js'

// Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnButton);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnButton);
}

// Single popups


// Key listeners
function closePopupOnButton(event) {
  if (event.key === settings.closePopupButton) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup }