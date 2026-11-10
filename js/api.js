// export async function getUserdata(username) {
// const response = await fetch(`https://api.github.com/users/${username}`);
// if (!response.ok) throw new Error("Erreur " + response.status);
// return response.json();
// }
// import { readFile } from "node:fs/promises";



// export function  getUserdata(username) {
//  return request(`https://api.github.com/users/${username}`);
// }

// export function getRepos(username) {
//  return request(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
// }






export async function getUserdata() {
    const response = await fetch("./data.json");

    if (!response.ok) {
        throw new Error("Failed to load data.json");
    }

    const data = await response.json();
    
    return data;
}