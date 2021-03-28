/**
 * A class displaying and managing user information on the page
 */

export default class UserInfo {
  constructor({nameSelector, infoSelector, avatarSelector, avatarClickHandler}){
    this._nameContainer = document.querySelector(nameSelector);
    this._infoContainer = document.querySelector(infoSelector);
    this._avatarContainer = document.querySelector(avatarSelector);
    this._avatarClickHandler = avatarClickHandler

  }

  getUserInfo(){
    return {name: this._userData.name, about: this._userData.about}
  }
 
  _renderUserInfo(){
    this._nameContainer.textContent = this._userData.name;
    this._infoContainer.textContent = this._userData.about;
    this._avatarContainer.style.backgroundImage = `url(${this._userData.avatar})`
  }  

  updateUserData(data){
    this._userData = data
    this._renderUserInfo()
  }

  setEventListeners() {
    this._avatarContainer.addEventListener('click', () => {
      this._avatarClickHandler()
    })
  }
}