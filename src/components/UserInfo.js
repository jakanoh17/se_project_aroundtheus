export default class UserInfo {
  constructor({ userNameSelec, descrSelec, aviSelec, nameInput, descrInput }) {
    this.userName = document.querySelector(userNameSelec);
    this.descr = document.querySelector(descrSelec);
    this.avatar = document.querySelector(aviSelec);
  }

  setUserInfo({ name, about, avatar }) {
    this.userName.textContent = name;
    this.descr.textContent = about;
    this.avatar.src = avatar;
  }

  //return user info when opening profile form
  getUserInfo() {
    return {
      name: this.userName.textContent,
      description: this.descr.textContent,
    };
  }
}
