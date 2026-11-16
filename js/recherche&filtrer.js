import { repos, getUserdata } from "./api.js";

const data = await repos();


export function FilterSearch(data, searchword, selectedLanguage) {
    const filteredrepo = data.filter(repo => {
        if (repo.language && repo.language.toLowerCase().includes(selectedLanguage)) {
            return repo
        }
    });
    if (searchword === "" && selectedLanguage === "all") return data
    else if (searchword === "" && selectedLanguage !== "all") return filteredrepo
    else if (searchword !== "" && selectedLanguage !== "all"){
        return  filteredrepo.filter(repo => { return repo.name.toLowerCase().includes(searchword.toLowerCase()) })
    }
    else if (searchword !== "" && selectedLanguage === "all") {
        return data.filter(repo => { return repo.name.toLowerCase().includes(searchword.toLowerCase()) })
    }
}