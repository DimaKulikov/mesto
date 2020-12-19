const popupShowBtn = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const popupSaveBtn = document.querySelector('.popup__save-btn');

function showPopup() {
  popup.classList.add('popup_opened');

  const name = document.querySelector('.profile__name');
  const subtitle = document.querySelector('.profile__subtitle');
  const nameField = document.querySelector('.popup__input_type_name');
  const subtitleField = document.querySelector('.popup__input_type_subtitle');

  nameField.value = name.textContent;
  subtitleField.value = subtitle.textContent;

}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function updatePopup() {
  const name = document.querySelector('.profile__name');
  const subtitle = document.querySelector('.profile__subtitle');
  const nameField = document.querySelector('.popup__input_type_name');
  const subtitleField = document.querySelector('.popup__input_type_subtitle');

  name.textContent = nameField.value;
  subtitle.textContent = subtitleField.value;

  closePopup();
}

popupShowBtn.addEventListener('click', showPopup);
popupCloseBtn.addEventListener('click', closePopup);
popupSaveBtn.addEventListener('click', updatePopup);