/**
 * Class representing a section where any content needs to be rendered dynamically
 */

export default class Section {
  /**
   * Creates a section
   * @param {object} param0 
   */
  constructor({data, renderer, containerSelector}){   
    this._container = document.querySelector(containerSelector)
    this.initData = data
    this._renderer = renderer
  }

  /**
   * Runs every item in the array of initial items through the passed in renderer function
   */
  renderItems(){
    this.initData.forEach(item => {
      this._renderer(item)
    })
  }

  /**
   * Inserts an element into the section container
   * @param {Element} item DOM Node to be inserted into the section container
   */
  addItem(item){
    this._container.prepend(item)    
  }
}