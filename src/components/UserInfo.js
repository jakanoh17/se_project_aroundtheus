export default class UserInfo {
  constructor({ userNameSelec, descrSelec }) {
    this.userName = document.querySelector(userNameSelec);
    this.descr = document.querySelector(descrSelec);
  }

  // get current user info
  getUserInfo() {
    this._userInfo = {
      name: document.querySelector(".profile__name"),
      title: document.querySelector(".profile__title"),
    };
    this.userName.value = this._userInfo.name.textContent;
    this.descr.value = this._userInfo.title.textContent;

    return this._userInfo;
  }

  setUserInfo({ name, description }) {
    this._userInfo.name.textContent = name;
    this._userInfo.title.textContent = description;
  }
}
