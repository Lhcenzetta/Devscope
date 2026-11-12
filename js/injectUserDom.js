const profilename = document.querySelector("#profile-name")
const profileusername = document.querySelector("#profile-username")
const profilebio = document.querySelector("#profile-bio")
const myimage = document.querySelector("#myImage")
const localisation = document.querySelector("#profile-location")
const profile_join = document.querySelector("#profile-join")
const repo_count = document.querySelector("#repo-count")
const followers_count = document.querySelector("#followers-count")
const following_count = document.querySelector("#following-count")
const profile_link = document.querySelector("#profile-link")
export function IjnectUser(user){
    profilename.textContent = user.name
    profileusername.textContent = user.login
    myimage.src = user.avatar_url
    profilebio.textContent = user.bio
    localisation.textContent = user.location
    profile_join.textContent = user.created_at
    repo_count.textContent = user.public_repos
    followers_count.textContent = user.followers
    following_count.textContent = user.following
    profile_link.href = user.html_url
}