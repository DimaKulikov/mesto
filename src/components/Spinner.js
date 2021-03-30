export default class Spinner {
  constructor(containerSelector, spinnerTemplateSelector) {
    this._container = document.querySelector(containerSelector);
    this._templateSelector = spinnerTemplateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content.cloneNode(true)
    return template
  }

  isLoading(isLoading) {
    if (isLoading) {
      this._container.style.display = 'block'
    } else {
      this._container.style.display = 'none'
    }
  }

  init() {
    this._container.style.display = 'none';
    const spinnerElement = this._getTemplate()
    this._container.append(spinnerElement)
  }
}
