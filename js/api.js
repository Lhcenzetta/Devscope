// export async function getUserdata(username) {
// const response = await fetch(`https://api.github.com/users/${username}`);
// return response.json();
// }
// export async function getRepos(username) {
// const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
// return response.json();
// }

// export function  getUserdata(username) {
//     const user = request(`https://api.github.com/users/${username}`);
//     if(user) {console.log(user)}
//     else {console.log("faah")}
    
//  return 
// }

// export function getRepos(username) {
//  return request(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
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