const btnclose = document.querySelector("#close-btn")
const modalModifier = document.querySelector("#modal-modifier")
const Cancel = document.querySelector("#modal-cancel")
const submitModal = document.querySelector("#modal-submit")
const status = document.querySelector("#status")
import { DeleteuserFromMock, GetUserMockApi, Modifieruser } from "./api.js"
import { DisplayShortlist } from "./ShortListUI.js"



const candidates = await GetUserMockApi();

export function deletuser(btnDelete,card ,candidate) {
    btnDelete.addEventListener("click", () => {
        btnDelete.disabled
        const id  = candidate.id
        DeleteuserFromMock(id)
        console.log(card)
        card.remove()
        DisplayShortlist(candidates)
    })
}

export  function ModifierUser(btnEdit, candidate) {
    btnEdit.addEventListener("click", () => {
        modalModifier.classList.remove("hidden")
        submitModal.addEventListener("click", async (e) => {
            e.preventDefault()
            const newobject = {
                login: candidate.login,
                name: candidate.name,
                avatar_url: candidate.avatar_url,
                html_url: candidate.html_url,
                language: repos[0].language ? repos[0].language : "Javascripte",
                rating: 5,
                status: "À contacter",
                note: "",
                createdAt: new Date().toISOString()
            }
             try {
                const id = candidate.id
                const response = await Modifieruser(id , newobject) 
            }
            catch (erreur) {
                
            }
        })
    })
}

btnclose.addEventListener("click", () => {
    modalModifier.classList.add("hidden")
})
Cancel.addEventListener("click", () => {
    modalModifier.classList.add("hidden")
})