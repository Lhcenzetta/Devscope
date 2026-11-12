import { getUserdata, getRepos , PostUser} from "./api.js";
import {InjectionReposDom} from "./InjectionReposDom.js"
import { IjnectUser } from "./injectUserDom.js";
const shortlist_btn = document.querySelector("#shortlist-btn")
const params = new URLSearchParams(window.location.search);
const username = params.get("code");


async function loadProfile(username) {
 try {
    const user = await  getUserdata(username);
    const repos = await getRepos(username);
    IjnectUser(user)
    InjectionReposDom(repos)
    shortlist_btn.addEventListener("click" , () => {
      const nouveauCandidat = {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        html_url:user.html_url,
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
//  if (error.status === 404) {
//  // afficher "Aucun développeur trouvé"
//  } else if (error.status === 403 || error.status === 429) {
//  // afficher "Limite de requêtes atteinte"
//  } else {
//  // afficher l'erreur réseau avec un bouton "Réessayer"
//  }
}
}
loadProfile(username);


