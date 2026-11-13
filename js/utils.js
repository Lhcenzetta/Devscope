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


export async function checkGithubUser(username) {
    const response = await fetch(
        `https://api.github.com/users/${encodeURIComponent(username)}`
    );

    if (!response.ok) {
        return false;
    }

    return true;
}

export function afficherMessage(texte, success) {
    const notification = document.querySelector("#notification");
    const message = document.querySelector("#message");

    message.textContent = texte;

    if (success) {
        notification.classList.remove("bg-red-100", "border-red-500");
        notification.classList.add("bg-green-100", "border-green-500");

        message.classList.remove("text-red-700");
        message.classList.add("text-green-700");
    }
    else {
        notification.classList.remove("bg-green-100", "border-green-500");
        notification.classList.add("bg-red-100", "border-red-500");

        message.classList.remove("text-green-700");
        message.classList.add("text-red-700");
    }
    notification.classList.remove("hidden");
    setTimeout(() => {
        notification.classList.add("hidden");
    }, 2000);
}