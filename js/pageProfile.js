import { getUser, PostUser, getRepos } from "./api.js";
import { InjectionReposDom } from "./InjectionReposDom.js"
import { FilterSearch } from "./recherche&filtrer.js"
import { IjnectUser } from "./injectUserDom.js";
import { ranger, relire } from "./cache.js";
const user_name = document.querySelector("#username")
const shortlist_btn = document.querySelector("#shortlist-btn")
const btn_search = document.querySelector("#btn2")
const loading = document.querySelector("#loading");
const overlay = document.querySelector("#loading-overlay");
const content = document.querySelector("#content")
const role = document.querySelector("#alert")
const searchrepo = document.querySelector("#searchrepo")
const buttons = document.querySelectorAll("#buttons > .filter-btn")

const repositories_container = document.querySelector("#repositories-container")
const params = new URLSearchParams(window.location.search);
const username = params.get("code");
user_name.value = username
let currentUser = null;


function showLoading() {
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
  content.innerHTML = ""
  role.classList.remove("hidden")
}

if (!username) {
  rolehide()
}


async function loadProfile(username) {
  showLoading();
  try {
    let user = relire(username) 
    let repos;
    if (user === null) {
      [user, repos] = await Promise.all([getUser(username), getRepos(username)])
      ranger(username , user)
    }
    else {
      repos = await getRepos(username);
    }
    
    currentUser = user;
    IjnectUser(user)
    InjectionReposDom(repos)
    handlefileter(repos)
    shortlist_btn.addEventListener("click", () => {
      if (!currentUser) return;
      const nouveauCandidat = {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        language: repos[0].language ? repos[0].language : "Javascripte",
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
      rolehide()
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

export function handlefileter(datarepos) {
  let selectedLanguage = "all";
  let searchword = "";

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedLanguage = btn.textContent
      const repos = FilterSearch(datarepos, searchword, selectedLanguage)
      InjectionReposDom(repos)
    })
  })
  searchrepo.addEventListener("input", (e) => {
    searchword = e.target.value.trim()
    const repos = FilterSearch(datarepos, searchword, selectedLanguage)
    InjectionReposDom(repos)
  })
}