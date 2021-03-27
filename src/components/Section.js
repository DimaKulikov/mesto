/**
 * A class representing a section that can append items to itself
 */
export default class Section {
  constructor({renderer, containerSelector}){   
    this._container = document.querySelector(containerSelector)
    this.initData = []
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