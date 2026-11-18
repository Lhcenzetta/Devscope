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

export function FilterSearchUser(data, searchword, selectedstatus) {
    const filteredstatus = data.filter(user => {
        if (user.status && user.status.includes(selectedstatus)) {
            return user
        }
    });
    if (searchword === "" && selectedstatus === "all") return data
    else if (searchword === "" && selectedstatus !== "all") return filteredstatus
    else if (searchword !== "" && selectedstatus !== "all") {
        return filteredstatus.filter(user => { return user.name.toLowerCase().includes(searchword.toLowerCase()) })
    }
    else if (searchword !== "" && selectedstatus === "all") {
        return data.filter(user => { return user.name.toLowerCase().includes(searchword.toLowerCase()) })
    }
}