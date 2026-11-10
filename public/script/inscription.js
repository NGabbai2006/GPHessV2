const identifiant = document.getElementById('identifiant'); // à changer
const motdepasse = document.getElementById('password'); // à changer
const confirmation = document.getElementById('confirmation'); // à changer
const bouton = document.getElementById('submit'); // à changer
const erreur = document.getElementById('error'); // à changer

const REGEX_USERNAME = /^.{4,16}$/;
const REGEX_PASSWORD = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,64})$/;

const REGEX_PASSWORD_8char = /^(.{8,64})$/;
const REGEX_PASSWORD_1maj = /(?=.*[A-Z])/;
const REGEX_PASSWORD_1min = /(?=.*[a-z])/;
const REGEX_PASSWORD_1chi = /(?=.*[0-9])/;
const REGEX_PASSWORD_1spe = /(?=.*[\W])/;

identifiant.addEventListener("input", () => {
    REGEX_USERNAME.test(identifiant.value) && REGEX_PASSWORD.test(motdepasse.value) && motdepasse.value == confirmation.value ? bouton.disabled = false : bouton.disabled = true;
})

motdepasse.addEventListener("input", () => {
    REGEX_PASSWORD_8char.test(motdepasse.value) ? document.getElementById("8char").style.textDecoration = "line-through" : document.getElementById("8char").style.textDecoration = "none";
    REGEX_PASSWORD_1maj.test(motdepasse.value) ? document.getElementById("1maj").style.textDecoration = "line-through" : document.getElementById("1maj").style.textDecoration = "none";
    REGEX_PASSWORD_1min.test(motdepasse.value) ? document.getElementById("1min").style.textDecoration = "line-through" : document.getElementById("1min").style.textDecoration = "none";
    REGEX_PASSWORD_1chi.test(motdepasse.value) ? document.getElementById("1chi").style.textDecoration = "line-through" : document.getElementById("1chi").style.textDecoration = "none";
    REGEX_PASSWORD_1spe.test(motdepasse.value) ? document.getElementById("1spe").style.textDecoration = "line-through" : document.getElementById("1spe").style.textDecoration = "none";

    REGEX_USERNAME.test(identifiant.value) && REGEX_PASSWORD.test(motdepasse.value) && motdepasse.value == confirmation.value ? bouton.disabled = false : bouton.disabled = true;
});

confirmation.addEventListener("input", () => {
    REGEX_USERNAME.test(identifiant.value) && REGEX_PASSWORD.test(motdepasse.value) && motdepasse.value == confirmation.value ? bouton.disabled = false : bouton.disabled = true;
})

bouton.addEventListener('click', () => {
    if (!REGEX_USERNAME.test(identifiant)) { erreur.textContent = "Identifiant invalide"; return; } 

    fetch("/api/inscription", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username": identifiant.value, "password": motdepasse.value, "confirmation": confirmation.value })
    }).then(function (res) {
        return res.json();
    }).then(function (data) {
        if (data.message == "Account created") { // modifier pour utiliser un code
            cookieStore.set("authToken", data.token);
            window.location.href = '/';
        } else {
            erreur.textContent = data.error; // changer data.error ?
        }
    }).catch(function (err) {
        console.error(err);
    });
});