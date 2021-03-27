export default class Api {
  constructor({baseUrl, headers}){
    this.baseUrl = baseUrl,
    this.headers = headers
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Произошла ошибка со статус-кодом ${res.status}`);
  }

  getInitialCards(){
    return fetch(this.baseUrl + '/cards', {
      headers: this.headers
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  getUserInfo(){
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  updateUserInfo(newInfo){
    return fetch(this.baseUrl + '/users/me', {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify(newInfo)
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  addCard(newCard){
    console.log(newCard)
    return fetch(this.baseUrl + '/cards', {
      headers: {...this.headers, 'content-type':'application/json'},
      method: 'POST',
      body: JSON.stringify(newCard)
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }
}
