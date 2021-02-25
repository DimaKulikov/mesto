import { settings, elements } from './constants.js'

// Popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', listenToEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', listenToEsc);
}

// Single popups
function showProfileEditPopup() {
  openPopup(elements.profileEditPopup);
  elements.profileNameInput.value = elements.profileName.textContent;
  elements.profileSubtitleInput.value = elements.subtitle.textContent;
  // fire input events to update submit button state and error messages
  const event = new Event('input', {
    bubbles: true,
    cancelable: true,
  });
  elements.profileNameInput.dispatchEvent(event);
  elements.profileSubtitleInput.dispatchEvent(event);
}

function showPlaceAddPopup() {
  openPopup(elements.placeAddPopup);
}

function showImagePopup(name, link) {
  openPopup(elements.imagePopup);
  elements.imagePopupImage.src = link;
  elements.imagePopupImage.alt = name;
  elements.imagePopupSubtitle.textContent = name;
}

// Key listeners
function listenToEsc(event) {
  if (event.key === settings.closePopupButton) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, showImagePopup, showPlaceAddPopup, showProfileEditPopup }