export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
    })
      .then(
        res => {
          if (res.ok) {
            return res.json()
          }
        }
      )
      .catch(err => console.log(err))
  }

  // другие методы работы с API
}

