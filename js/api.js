import { afficherMessage } from "./utils.js";
// export async function getUserdata(username) {
// const response = await fetch(`https://api.github.com/users/${username}`);
// return response.json();
// }
// export async function getRepos(username) {
// const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
// return response.json();
// }



export async function getRepos() {
    const response = await fetch("./repos.json");

    if (!response.ok) {
        throw new Error("Failed to load data.json");
    }

    const data = await response.json();
    
    return data;
}

export async function getUserdata() {
    const response = await fetch("./data.json");

    if (!response.ok) {
        throw new Error("Failed to load data.json");
    }

    const data = await response.json();
    
    return data;
}

export async function GetUserMockApi() {
    const response = await fetch("https://6af4a53655a1de7dcf04573c.mockapi.io/api/v1/candidats")
    if (!response.ok)
        throw new Error("Failed to load data from that api")
    const data = await response.json()
    return data
}


export async function PostUser(nouveauCandidat){
    const data = await GetUserMockApi();
    const isexist = data.some(user => user.login === nouveauCandidat.login)
    if (!isexist){
        const response = await fetch("https://6af4a53655a1de7dcf04573c.mockapi.io/api/v1/candidats" , {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nouveauCandidat)
     })
     afficherMessage("The user has add successfully", true)
    }
    else
        afficherMessage("This user aleadry exist in ShortList !", false)
}