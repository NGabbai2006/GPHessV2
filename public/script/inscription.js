const identifiant = document.getElementById('identifiant'); // à changer
const motdepasse = document.getElementById('password'); // à changer
const confirmation = document.getElementById('confirmation'); // à changer
const bouton = document.getElementById('submit'); // à changer
const erreur = document.getElementById('error'); // à changer

const REGEX_USERNAME = /^.{4,16}$/;
const REGEX_PASSWORD = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,64})$/;

bouton.addEventListener('click', () => {
    if (motdepasse != confirmation) { erreur.textContent = "Les mots de passe ne correspondent pas"; return; }

    if (!REGEX_USERNAME.test(identifiant)) { erreur.textContent = "Identifiant invalide"; return; }
    if (!REGEX_PASSWORD.test(motdepasse)) { erreur.textContent = "Mot de passe invalide"; return; } 
    // faire en sorte que ça affiche chaque caractéristiques du mot de passe (8 caractères, 1 chiffre, etc)

    fetch("/api/inscription", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "username": identifiant.value, "password": motdepasse.value })
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