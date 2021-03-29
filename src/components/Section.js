export default class Section {
  constructor({ renderer, containerSelector, initData }) {
    this._container = document.querySelector(containerSelector)
    this.initData = initData
    this._renderer = renderer
  }

  renderItems(items){
    this._items = items
    this._items.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(item) {
    this._container.prepend(item)    
  }
}