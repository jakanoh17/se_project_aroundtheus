export default class Api {
  constructor(options) {
    this.options = options;
    this._baseUrl = this.options.baseUrl;
  }

  _makeRequest(endpoint) {
    return fetch(this._baseUrl + endpoint, this.options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._makeRequest("/cards");
  }

  //get user info for the website
  getInitialUserInfo() {
    return this._makeRequest("/users/me");
  }

  editUserInfo(name, about) {
    this.options.method = "PATCH";
    this.options.body = JSON.stringify({
      name,
      about,
    });
    return this._makeRequest("/users/me");
  }

  postCards(name, link) {
    this.options.method = "POST";
    this.options.body = JSON.stringify({
      name,
      link,
    });
    return this._makeRequest("/cards");
  }

  deleteCardInfo(cardId) {
    this.options.method = "DELETE";

    return this._makeRequest(`/cards/${cardId}`);
  }

  toggleLikeCard(cardId, method) {
    this.options.method = method;
    return this._makeRequest(`/cards/${cardId}/likes`);
  }

  editAvatar(avatarObj) {
    this.options.method = "PATCH";
    this.options.body = JSON.stringify(avatarObj);
    return this._makeRequest("/users/me/avatar");
  }
}
