import { getUserdata, PostUser, getRepos } from "./api.js";
import {InjectionReposDom} from "./InjectionReposDom.js"
import { IjnectUser } from "./injectUserDom.js";
const user_name = document.querySelector("#username")
const shortlist_btn = document.querySelector("#shortlist-btn")
const btn_search = document.querySelector("#btn2")
const params = new URLSearchParams(window.location.search);
const username = params.get("code");
user_name.value = username
let currentUser = null;


async function loadProfile(username) {
  try {
    const user = await getUserdata(username);
    const repos = await getRepos(username);
    currentUser = user;
    IjnectUser(user)
    InjectionReposDom(repos)
    errorMessage.classList.add("hidden");
    shortlist_btn.addEventListener("click", () => {
      if (!currentUser) return;
      const nouveauCandidat = {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        language: "JavaScripte",
        rating: 5,
        status: "À contacter",
        note: "",
        createdAt: new Date().toISOString()
      };
      PostUser(nouveauCandidat)
    });
  }
  catch (error) {

  }
}

loadProfile(username);

btn_search.addEventListener("click", () => {
  loadProfile(user_name.value);
});