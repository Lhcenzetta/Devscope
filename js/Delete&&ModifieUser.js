import { DeleteuserFromMock, GetUserMockApi, Modifieruser } from "./api.js";
import { DisplayShortlist } from "./ShortListUI.js";
const btnclose = document.querySelector("#close-btn")
const Cancel = document.querySelector("#modal-cancel");
const modalModifier = document.querySelector("#modal-modifier");
const formCandidate = document.querySelector("#form-condidat");
const modalConfirmation = document.querySelector("#modal-confirmation");
const btnCancel = document.querySelector("#Annuler-confirmation");
const btnConfirm = document.querySelector("#confirmedelete");
const status = document.querySelector("#status");
const rating = document.querySelector("#rating");
const note = document.querySelector("#note");
const statuserr = document.querySelector("#status-err");
const raterror = document.querySelector("#rate-err");
const noteerr = document.querySelector("#note-err");
const loading = document.querySelector("#loading");
const overlay = document.querySelector("#loading-overlay");
const bouton = document.querySelector("#modal-submit");
const error = document.querySelector("#error")
let selectedCandidate = null;
let confirme = false
function showLoading() {
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    overlay.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
    loading.classList.remove("flex");
    overlay.classList.add("hidden");
}
export function deletuser(btnDelete, card, candidate) {

    btnDelete.addEventListener("click", () => {

        modalConfirmation.classList.remove("hidden");
        btnConfirm.onclick = async () => {
            try {
                showLoading();
                btnConfirm.disabled = true;
                await DeleteuserFromMock(candidate.id);
                const updatedCandidates = await GetUserMockApi();
                DisplayShortlist(updatedCandidates);
                modalConfirmation.classList.add("hidden");
            }
            catch (err) {
                error.textContent = error;

            } finally {
                hideLoading();
                btnConfirm.disabled = false;
            }
        };
    });
}

export function ModifierUser(btnEdit, candidate) {
    btnEdit.addEventListener("click", () => {
        selectedCandidate = candidate;
        status.value = candidate.status || "A contacter";
        rating.value = candidate.rating ?? "0";
        note.value = candidate.note || "";
        clearErrors();
        modalModifier.classList.remove("hidden");
    });
}

formCandidate.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (!selectedCandidate) return;

    clearErrors();

    const newobject = {
        login: selectedCandidate.login,
        name: selectedCandidate.name,
        avatar_url: selectedCandidate.avatar_url,
        html_url: selectedCandidate.html_url,
        language: selectedCandidate.language || "JavaScript",
        status: status.value,
        rating: Number(rating.value),
        note: note.value.trim(),
        createdAt: selectedCandidate.createdAt || new Date().toISOString()
    };

    let isValid = true;

    if (!status.value) {
        statuserr.textContent = "Veuillez choisir un statut.";
        isValid = false;
    }

    if (rating.value === "0") {
        raterror.textContent = "Veuillez choisir une note.";
        isValid = false;
    }

    if (!isValid) return;

    try {
        showLoading();
        bouton.disabled = true;

        await Modifieruser(selectedCandidate.id, newobject);

        const updatedCandidates = await GetUserMockApi();

        DisplayShortlist(updatedCandidates);

        modalModifier.classList.add("hidden");

        formCandidate.reset();
        selectedCandidate = null;

    } catch (err) {
        console.error(err);
        error.textContent = "Erreur lors de la modification.";

    } finally {
        bouton.disabled = false;
        hideLoading();
    }
});


function clearErrors() {
    statuserr.textContent = "";
    raterror.textContent = "";
    noteerr.textContent = "";
}

btnCancel.addEventListener("click", () => {
    modalConfirmation.classList.add("hidden");
});
btnclose.addEventListener("click", () => {
    modalModifier.classList.add("hidden")
})
Cancel.addEventListener("click", () => {
    modalModifier.classList.add("hidden")
})