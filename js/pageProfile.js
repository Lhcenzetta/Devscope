import { getUserdata, getRepos} from "./api.js";
import {InjectionReposDom} from "./InjectionReposDom.js"
const profilename = document.querySelector("#profile-name")
const profileusername = document.querySelector("#profile-username")
const profilebio = document.querySelector("#profile-bio")
const myimage = document.querySelector("#myImage")
const localisation = document.querySelector("#profile-location")
const profile_join = document.querySelector("#profile-join")
const repo_count = document.querySelector("#repo-count")
const followers_count = document.querySelector("#followers-count")
const following_count = document.querySelector("#following-count")

const params = new URLSearchParams(window.location.search);
const username = params.get("code");


async function loadProfile(username) {
 try {
    const user = await  getUserdata(username);
    const repos = await getRepos(username);
    profilename.textContent = user.name
    profileusername.textContent = user.login
    myimage.src = user.avatar_url
    profilebio.textContent = user.bio
    localisation.textContent = user.location
    profile_join.textContent = user.created_at
    repo_count.textContent = user.public_repos
    followers_count.textContent = user.followers
    following_count.textContent = user.following
    InjectionReposDom(repos)
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


