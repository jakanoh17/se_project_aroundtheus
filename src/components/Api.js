export default class Api {
  constructor(options) {
    this.options = options;
  }

  _definePromise(url) {
    return fetch(url, this.options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  getUserInfo() {
    return this._definePromise(
      "https://around-api.en.tripleten-services.com/v1/users/me"
    );
  }

  getInitialCards() {
    return this._definePromise(
      "https://around-api.en.tripleten-services.com/v1/cards"
    );
  }

  deleteCardInfo(cardId) {
    return this._definePromise(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`
    );
  }

  toggleLikeCard(cardId) {
    return this._definePromise(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`
    );
  }

  editAvatar() {
    return this._definePromise(
      "https://around-api.en.tripleten-services.com/v1/users/me/avatar"
    );
  }
}

//come back to this; ref: Gen recs #5
function setWebpageStart() {
  return Promise.all(cardPromises);
}
