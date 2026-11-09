import {GetUsernameValid} from "./utils.js"
// import {search} from "./scripte.js"
import {form} from "./scripte.js"
export function Search_User(){
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = form.querySelector("input");
        const username = input.value.trim();
        let valid = GetUsernameValid(username)
        if (valid){
            window.location.href = `recherche.html?code=${encodeURIComponent(username)}`;
        }        
    });
}