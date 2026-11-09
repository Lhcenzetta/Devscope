const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const error = document.querySelector('#error');

export function GetUsernameValid(value) {
    if (!regex.test(value.trim())) {
        error.textContent = "Invalid GitHub username!";
        error.classList.remove('hidden');
        return false;
    }
    error.classList.add('hidden');
    return true;
}


// async function checkGithubUser(username) {
//     const response = await fetch(
//         `https://api.github.com/users/${encodeURIComponent(username)}`
//     );

//     if (!response.ok) {
//         return false;
//     }

//     return true;
// }