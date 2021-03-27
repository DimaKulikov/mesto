/**
 * A class representing a section where any content needs to be rendered dynamically
 *
 * @export
 * @class Section
 */
export default class Section {

  /**
   * Creates an instance of Section.
   * @param {*} {data, renderer, containerSelector}
   * @memberof Section
   */
  constructor({ initData, renderer, containerSelector }) {
    this._container = document.querySelector(containerSelector)
    this.initData = initData
    this._renderer = renderer
  }

  /**
   * Runs every item in the array of initial items through the passed in renderer function
   *
   * @memberof Section
   */
  renderItems(){
    this.initData.forEach(item => {
      this._renderer(item)
    })
  }

  /**
   * Inserts an element into the section container
   *
   * @param {HTMLElement} item DOM element to be inserted into the section container
   * @memberof Section
   */
  addItem(item) {
    this._container.prepend(item)    
  }
}