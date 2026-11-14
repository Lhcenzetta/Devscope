import { MOCKAPI_URL , GITHUB_API} from "./config.js";
import { afficherMessage } from "./utils.js";
export async function getUserdata(username) {
const response = await fetch(`${GITHUB_API}/${username}`);
if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status}`);
}
return response.json();
}
export async function getRepos(username) {
const response = await fetch(`${GITHUB_API}/${username}/repos?per_page=100&sort=updated`);
if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status}`);
}
return response.json();
}


export async function GetUserMockApi() {
    const response = await fetch(MOCKAPI_URL)
    if (!response.ok)
        throw new Error("Failed to load data from that api")
    const data = await response.json()
    return data
}


export async function PostUser(nouveauCandidat){
    const data = await GetUserMockApi();
    const isexist = data.some(user => user.login === nouveauCandidat.login)
    if (!isexist){
        const response = await fetch(MOCKAPI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveauCandidat)
     })
     afficherMessage("The user has add successfully", true)
    }
    else
        afficherMessage("This user aleadry exist in ShortList !", false)
}

