import { profNameInput, profDescrInput } from "../utils/constants";

export default class UserInfo {
  constructor({ userNameSelec, descrSelec, aviSelec }) {
    this.userName = document.querySelector(userNameSelec);
    this.descr = document.querySelector(descrSelec);
    this.avatar = document.querySelector(aviSelec);
  }

  setUserInfo({ name, about, avatar }) {
    this.userName.textContent = name;
    this.descr.textContent = about;
    this.avatar.src = avatar;
  }

  //get user info when opening profile form
  getUserInfo() {
    profNameInput.value = this.userName.textContent;
    profDescrInput.value = this.descr.textContent;
  }
}
