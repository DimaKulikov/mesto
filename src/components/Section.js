export default class Section {
  constructor({items, renderer}, containerSelector){   
    this._container = document.querySelector(containerSelector)
    this._initialArray = items
    this._renderer = renderer
  }

  renderItems(){
    this._initialArray.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(item){
    this._container.append(item)    
  }
}