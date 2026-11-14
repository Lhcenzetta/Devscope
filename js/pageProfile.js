import { getUser, PostUser, getRepos } from "./api.js";
import {InjectionReposDom} from "./InjectionReposDom.js"
import { IjnectUser } from "./injectUserDom.js";
const user_name = document.querySelector("#username")
const shortlist_btn = document.querySelector("#shortlist-btn")
const btn_search = document.querySelector("#btn2")
const loading = document.querySelector("#loading");
const overlay = document.querySelector("#loading-overlay");
const content = document.querySelector("#content")
const role = document.querySelector("#alert")
const params = new URLSearchParams(window.location.search);
const username = params.get("code");
user_name.value = username
let currentUser = null;


function showLoading() {
  console.log(loading)
  loading.classList.remove("hidden");
  loading.classList.add("flex");

  overlay.classList.remove("hidden");
}

function hideLoading() {
  loading.classList.add("hidden");
  loading.classList.remove("flex");
  overlay.classList.add("hidden");
}

function rolehide() {
  role.classList.remove("hidden")
}

async function loadProfile(username) {
  showLoading();
  try {
    const user = await getUser(username);
    const repos = await getRepos(username);
    currentUser = user;
    IjnectUser(user)
    InjectionReposDom(repos)
    // errorMessage.classList.add("hidden");
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
    if (error.status === 404 || error.status === 403 || error.status === 500) {
      content.innerHTML = ""
      role.classList.remove("hidden")
    }
  }
  finally {
    hideLoading();
  }
}

loadProfile(username);

btn_search.addEventListener("click", () => {
  loadProfile(user_name.value);
});