export default class Api {
  constructor(options) {
    this.options = options;
  }

  _makeRequest(url) {
    return fetch(url, this.options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    return this._makeRequest(
      "https://around-api.en.tripleten-services.com/v1/cards"
    );
  }

  //get user info for the website
  getInitialUserInfo() {
    return this._makeRequest(
      "https://around-api.en.tripleten-services.com/v1/users/me"
    );
  }

  editUserInfo(name, about) {
    this.options.method = "PATCH";
    this.options.body = JSON.stringify({
      name,
      about,
    });
    return this._makeRequest(
      "https://around-api.en.tripleten-services.com/v1/users/me"
    );
  }

  postCards(name, link) {
    this.options.method = "POST";
    this.options.body = JSON.stringify({
      name,
      link,
    });
    return this._makeRequest(
      "https://around-api.en.tripleten-services.com/v1/cards"
    );
  }

  deleteCardInfo(cardId) {
    this.options.method = "DELETE";

    return this._makeRequest(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`
    );
  }

  toggleLikeCard(cardId, method) {
    this.options.method = method;
    return this._makeRequest(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`
    );
  }

  editAvatar(avatarObj) {
    this.options.method = "PATCH";
    this.options.body = JSON.stringify(avatarObj);
    return this._makeRequest(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar"
    );
  }
}

// //come back to this; ref: Gen recs #5
// function setWebpageStart() {
//   return Promise.all(cardPromises);
// }
