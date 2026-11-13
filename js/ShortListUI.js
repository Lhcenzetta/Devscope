import { GetUserMockApi } from "./api.js";
const shortlistContainer = document.querySelector("#shortlist-container");
const shortlistCount = document.querySelector("#shortlist-count");

export async function DisplayShortlist() {
    const candidates = await GetUserMockApi();
   
    shortlistContainer.textContent = "";

    shortlistCount.textContent = `${candidates.length} candidat(s) dans votre shortlist`;

    candidates.forEach(candidate => {

        const card = document.createElement("div");
        card.className = "flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-white/5 bg-[#0e1120] p-4 transition hover:border-cyan-400/20";

        const profile = document.createElement("div");
        profile.className = "flex items-center gap-4";

        const avatar = document.createElement("img");
        avatar.src = candidate.avatar_url;
        avatar.alt = candidate.name;
        avatar.className = "h-11 w-11 rounded-full border-2 border-purple-500 object-cover";

        const info = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = candidate.name;
        name.className = "text-sm font-bold text-gray-200";

        const username = document.createElement("a");
        username.textContent = "@" + candidate.login;
        username.href = candidate.html_url;
        username.target = "_blank";
        username.rel = "noopener noreferrer";
        username.className = "text-xs text-gray-500 hover:text-cyan-400";

        const language = document.createElement("span");
        language.textContent = candidate.language;
        language.className = "ml-2 rounded-md bg-cyan-500/10 px-2 py-1 text-[10px] text-cyan-400";


        const note = document.createElement("p");
        note.textContent = candidate.note || "Aucune note.";
        note.className = "mt-1 text-xs italic text-gray-400";

        const date = document.createElement("p");
        date.textContent = "Ajouté le " + new Date(candidate.createdAt).toLocaleDateString("fr-FR");
        date.className = "mt-1 text-[10px] text-gray-500";

        info.appendChild(name);
        info.appendChild(username);
        info.appendChild(language);
        info.appendChild(note);
        info.appendChild(date);

        profile.appendChild(avatar);
        profile.appendChild(info);

        const actions = document.createElement("div");
        actions.className = "flex items-center gap-3 self-end md:self-center";


        const rating = document.createElement("span");
        rating.textContent = "★".repeat(candidate.rating) + "☆".repeat(5 - candidate.rating);
        rating.className = "text-sm tracking-wider text-lime-400";

        const status = document.createElement("span");
        status.textContent = candidate.status;

        status.className = "rounded-md border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold text-cyan-400";

  
        actions.appendChild(rating);
        actions.appendChild(status);
        card.appendChild(profile);
        card.appendChild(actions);

        shortlistContainer.appendChild(card);

    });
}
DisplayShortlist()