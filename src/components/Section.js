export default class Section {
  constructor({data, renderer}, containerSelector){   
    this._container = document.querySelector(containerSelector)
    this.initData = data
    this._renderer = renderer
  }

  renderItems(){
    this.initData.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(item){
    this._container.append(item)    
  }
}