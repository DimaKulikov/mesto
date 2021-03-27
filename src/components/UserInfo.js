/**
 * A class displaying and managing user information on the page
 */

export default class UserInfo {
  constructor({nameSelector, infoSelector}){
    this._nameContainer = document.querySelector(nameSelector);
    this._infoContainer = document.querySelector(infoSelector);


  }

  getUserInfo(){
    return {name: this._userData.name, about: this._userData.about}
  }
 
  renderUserInfo(){
    this._nameContainer.textContent = this._userData.name;
    this._infoContainer.textContent = this._userData.about;
  }

  updateUserData(data){
    this._userData = data
    this.renderUserInfo()
  }
}