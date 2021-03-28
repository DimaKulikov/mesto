export default class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl,
    this._headers = headers,
    this.deleteLike = this.deleteLike.bind(this),
    this.putLike = this.putLike.bind(this)
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Произошла ошибка со статус-кодом ${res.status}`);
  }

  getInitialCards(){
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  getUserInfo(){
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  updateUserInfo(newInfo){
    return fetch(this._baseUrl + '/users/me', {
      headers: {...this._headers, 'content-type':'application/json'},
      method: 'PATCH',
      body: JSON.stringify(newInfo)
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  addCard(newCard){
    return fetch(this._baseUrl + '/cards', {
      headers: {...this._headers, 'content-type':'application/json'},
      method: 'POST',
      body: JSON.stringify(newCard)
    })
      .then(res => {console.log(res); return this._parseResponse(res)})
      .catch(err => Promise.reject(err));
  }

  deleteCard(cardId){
    return fetch(this._baseUrl + '/cards/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  putLike(cardId){
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }

  deleteLike(cardId){
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => this._parseResponse(res))
      .catch(err => Promise.reject(err));
  }
}
