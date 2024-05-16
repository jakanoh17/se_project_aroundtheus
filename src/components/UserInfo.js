export default class UserInfo {
  constructor({ userNameSelec, descrSelec, aviSelec }) {
    this.userName = document.querySelector(userNameSelec);
    this.descr = document.querySelector(descrSelec);
    this.avatar = document.querySelector(aviSelec);
  }

  setUserInfo({ name, description, avatar }) {
    this.userName.textContent = name;
    this.descr.textContent = description;
    this.avatar.src = avatar;
  }
}
