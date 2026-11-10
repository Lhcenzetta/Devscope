import { getUserdata} from "./api.js";
const profilename = document.querySelector("#profile-name")
const profileusername = document.querySelector("#profile-username")
const profilebio = document.querySelector("#profile-bio")
const myimage = document.querySelector("#myImage")
const localisation = document.querySelector("#profile-location")
const profile_join = document.querySelector("#profile-join")
const repo_count = document.querySelector("#repo-count")
const followers_count = document.querySelector("#followers-count")
const following_count = document.querySelector("#following-count")

// const params = new URLSearchParams(window.location.search);
// const username = params.get("code");


async function loadProfile() {
 try {
    const user = await  getUserdata();
    // const repos = await getRepos(username);
    profilename.textContent = user.name
    profileusername.textContent = user.login
    myimage.src ="https://avatars.githubusercontent.com/u/161524626?v=4"
    profilebio.textContent = user.bio
    localisation.textContent = user.location
    profile_join.textContent = user.created_at
    repo_count.textContent = user.public_repos
    followers_count.textContent = user.followers
    following_count.textContent = user.following
 } catch (error) {
 if (error.status === 404) {
 // afficher "Aucun développeur trouvé"
 } else if (error.status === 403 || error.status === 429) {
 // afficher "Limite de requêtes atteinte"
 } else {
 // afficher l'erreur réseau avec un bouton "Réessayer"
 }
 }
}
loadProfile();


