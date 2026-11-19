import { MOCKAPI_URL , GITHUB_API} from "./config.js";
import { afficherMessage } from "./utils.js";
async function request(url, options = {}) {
    const response = await fetch(url, options); // erreur réseau -> lancée ici
    if (!response.ok) {
        const error = new Error("Erreur HTTP " + response.status);
        error.status = response.status; // 404, 403, 429, 500...
        throw error;
    }
    return response.json();
}

export function getUser(username) {
    return request(`${GITHUB_API}/users/${username}`);
}
export function getRepos(username) {
    return request(`${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated`);
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
    if (!isexist) {
        const response = await fetch(MOCKAPI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nouveauCandidat)
        })
        afficherMessage("The user has add successfully", true)
        return;
    }
    afficherMessage("This user aleadry exist in ShortList !", false)
}


export async function DeleteuserFromMock(id) {
    const data = await GetUserMockApi();
    const user = data.find(user => user.id === id)
    if (user) {
        const response = await fetch(`${MOCKAPI_URL}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        afficherMessage("The user has deleted successfully", true)
        return;
    }
}

export async function Modifieruser(id, newobject) {
    const data = await GetUserMockApi();
    const user = data.find(user => user.id === id);
    if (!user) {
        throw new Error("Candidate not found");
    }
    const response = await fetch(`${MOCKAPI_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newobject)
    });
    afficherMessage("The user has Modified successfully", true)
    if (!response.ok) {
        throw new Error("Failed to update candidate");
    }
    return await response.json();
}