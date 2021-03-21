/**
 * A class displaying and modifying user information on the page
 */
/**
 * A class displaying and modifying user information on the page
 *
 * @export
 * @class UserInfo
 */
export default class UserInfo {
  /**
   * 
   * @param {object} param0 object containing css selectors of DOM nodes that display user information
   */
  constructor({nameSelector, infoSelector}){
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }

  /**
   * Returns current user info displayed on the page as an object
   * @returns {object} object containing user name and user description
   */
  getUserInfo(){
    return {name: this._name.textContent, info: this._info.textContent}
  }

  /**
   * Takes new user data and displays it on the page
   * @param {object} param0 object containing user name and user description
   */
  setUserInfo({name,info}){
    this._info.textContent = info;
    this._name.textContent = name;
  }
}