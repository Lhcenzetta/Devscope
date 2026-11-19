const DUREE = 10 * 60 * 1000

export function ranger(cle, valeur) {
    localStorage.setItem(cle, JSON.stringify({ date: Date.now(), valeur}));
}

export function relire(cle) {
    const texte = localStorage.getItem(cle);
    if (texte === null) return null;
    const entree = JSON.parse(texte);
    if (Date.now() - entree.date > DUREE) return null; 
    return entree.valeur;
}