export default class Section {
  constructor({items, renderer},containerSelector){   
    this._container = document.querySelector(containerSelector)
    this._initialArray = items
    this._renderer = renderer
  }

  addItem(){
    
  }
}