const identifiant = document.getElementById('identifiant'); // à changer
const motdepasse = document.getElementById('password'); // à changer
const bouton = document.getElementById('submit'); // à changer
const erreur = document.getElementById('error'); // à changer

bouton.addEventListener('click', () => {
    fetch('/api/login', {
        method: 'POST',
        headers: { "Content-Type" : "application/json"},
        body: JSON.stringify({ "username": identifiant.value, "password": motdepasse.value}) // à changer
    }).then(function (res) {
        return res.json();
    }).then(function(data) {
        if (data.message == "Connexion réussie") { // modifier pour mettre un code
            cookieStore.set("authToken", data.token);
            window.location.href = '/';
        } else {
            erreur.textContent = data.error; // changer data.error ?
        }
    }).catch(function (err) {
        console.error(err);
    });
});