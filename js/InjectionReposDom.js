const countrepos = document.querySelector("#total-repos")
const reposContainer = document.querySelector("#repositories-container");

export function InjectionReposDom(repos) {
    countrepos.textContent =repos.length
    reposContainer.textContent = "";
    repos.forEach(repo => {
        const card = document.createElement("div");

        card.className = "group rounded-xl border border-white/10 bg-[#151827] p-5 transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/5";
        const title = document.createElement("h3");
        title.textContent = repo.name;
        title.className = "text-lg font-bold text-blue-400 break-all";

        const badge = document.createElement("span");
        badge.textContent = "Public";
        badge.className = "rounded-full border border-blue-400/20 bg-blue-400/10 px-2 py-1 text-xs text-blue-400";

        const header = document.createElement("div");
        header.className = "flex items-start justify-between gap-3";

        header.appendChild(title);
        header.appendChild(badge);


        const description = document.createElement("p");
        description.textContent = repo.description || "No description available";
        description.className = "mt-3 min-h-[48px] text-sm leading-relaxed text-gray-400";

    
        const language = document.createElement("span");
        language.textContent = repo.language || "Unknown";
        language.className = "text-xs text-gray-400";

        const stars = document.createElement("span");
        stars.textContent = `⭐ ${repo.stargazers_count}`;
        stars.className = "text-xs text-gray-400";

        const forks = document.createElement("span");
        forks.textContent = `🍴 ${repo.forks_count}`;
        forks.className = "text-xs text-gray-400";

        const information = document.createElement("div");
        information.className = "mt-5 flex flex-wrap items-center gap-4 border-t border-white/5 pt-4";

        information.appendChild(language);
        information.appendChild(stars);
        information.appendChild(forks);

        const link = document.createElement("a");
        link.textContent = "View repository ↗";
        link.href = repo.html_url;
        link.className = "mt-5 flex items-center justify-center rounded-lg border border-blue-400/20 bg-blue-400/5 px-4 py-2.5 text-sm font-semibold text-blue-400 hover:bg-blue-400/15";

        card.appendChild(header);
        card.appendChild(description);
        card.appendChild(information);
        card.appendChild(link);

        reposContainer.appendChild(card);

    });
}