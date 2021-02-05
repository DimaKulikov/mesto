const options = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_active'
};

const showInputError = ({ form, input, errorMessage, inputErrorClass, errorClass }) => {
  const errorContainer = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorContainer.textContent = errorMessage;
  errorContainer.classList.add(errorClass);
}

const hideInputError = ({ form, input, inputErrorClass, errorClass }) => {
  const errorContainer = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorClass);
  errorContainer.textContent = '';
}

const isValid = ({ form, input, rest: { inputErrorClass, errorClass } }) => {
  if (!input.validity.valid) {
    const errorMessage = input.validationMessage;
    showInputError({ form, input, errorMessage, inputErrorClass, errorClass })
  } else {
    hideInputError({ form, input, inputErrorClass, errorClass });
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid);
};

const toggleButtonState = ({ inputList, button, inactiveButtonClass }) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactiveButtonClass);
  } else {
    button.classList.remove(inactiveButtonClass);
  }
};

const setEventListeners = ({ form, rest: { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest } }) => {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  inputList.forEach(input => {
    input.addEventListener('input', () => {
      isValid({ form, input, rest });
      toggleButtonState({ inputList, button, inactiveButtonClass });
    });
  });
};

const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((form) => {
    form.addEventListener('submit', (e) => e.preventDefault());
    setEventListeners({ form, rest });
  });
};

enableValidation(options);