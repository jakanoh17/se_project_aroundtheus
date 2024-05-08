export default class UserInfo {
  constructor({ userNameSelec, descrSelec }) {
    this.userName = document.querySelector(userNameSelec);
    this.descr = document.querySelector(descrSelec);
  }

  // get current user info
  getUserInfo() {
    return {
      name: this.userName.textContent,
      description: this.descr.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this.userName.textContent = name;
    this.descr.textContent = description;
  }
}
