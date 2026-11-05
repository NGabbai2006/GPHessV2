const inscriptionButton = document.getElementById('buttonInscription');

if (inscriptionButton) {
    inscriptionButton.addEventListener('click', () => {
        const username = document.getElementById('idInscription').value;
        const password = document.getElementById('idPassword').value;
        const confirmPassword = document.getElementById('confirmation').value;
        const errorText = document.getElementById("error");

        const USERNAME_PATTERN = /^.{4,16}$/;
        const PASSWORD_PATTERN = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{8,64})$/;

        if (password != confirmPassword) {
            console.error("Les mots de passe ne correspondent pas");
            errorText.textContent = "Les mots de passe ne correspondent pas";
            return;
        }
        if (!USERNAME_PATTERN.test(username)) {
            errorText.textContent = "Username invalide";
            return;
        }
        if (!PASSWORD_PATTERN.test(password)) {
            errorText.textContent = "Mot de passe invalide";
            return;
        }

        fetch('/api/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": username, "password": password })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            console.log(data);
            if (data.message === "Account created") {
                window.location.href = "login";
            } else {
                errorText.textContent = data.message || data.error;
            }
        }).catch(function (err) {
            console.error(err);
        });
    });
}

const connexionButton = document.getElementById('loginButton');

if (connexionButton) {
    connexionButton.addEventListener('click', () => {
        const loginUsername = document.getElementById('login').value;
        const loginPassword = document.getElementById('password').value;
        const errorText = document.getElementById("error");

        fetch('/api/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "username": loginUsername, "password": loginPassword })
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            console.log(data);
            if (data.message === "Connexion réussie") {
                localStorage.setItem("token", data.token);
                window.location.href = "/"; // l'index est sur "/", pas "index"
            } else if (errorText) {
                errorText.textContent = data.error;
            }
        }).catch(function (err) {
            console.error(err);
        });
    });
}

const blocConnecte = document.getElementById('connecte');
const blocVisiteur = document.getElementById('visiteur');

// Appelle l'API en envoyant le token
function appelApi(url, body) {
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(body || {})
    }).then(function (res) {
        return res.json();
    });
}

function deconnexion() {
    localStorage.removeItem("token");
    window.location.href = "/";
}

if (blocConnecte) {
    const message = document.getElementById('message');
    const token = localStorage.getItem("token");

    // On vérifie que le token est valide
    if (token) {
        fetch('/api/me', {
            headers: { "Authorization": "Bearer " + token }
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.error) {
                localStorage.removeItem("token"); // faux ou expiré
                return;
            }
            blocVisiteur.hidden = true;
            blocConnecte.hidden = false;
            document.getElementById('nomUtilisateur').textContent = data.username;
            chargerUtilisateurs();
        }).catch(function (err) {
            console.error(err);
        });
    }

    document.getElementById('logoutButton').addEventListener('click', deconnexion);

    document.getElementById('changeUserButton').addEventListener('click', () => {
        const newUsername = document.getElementById('newUsername').value;

        appelApi('/api/changeuser', { newUsername: newUsername }).then(function (data) {
            if (data.error) {
                message.textContent = data.error;
                return;
            }
            localStorage.setItem("token", data.token);
            document.getElementById('nomUtilisateur').textContent = newUsername;
            message.textContent = data.message;
            chargerUtilisateurs();
        });
    });

    document.getElementById('changePasswordButton').addEventListener('click', () => {
        const oldPassword = document.getElementById('oldPassword').value;
        const newPassword = document.getElementById('newPassword').value;

        appelApi('/api/changepassword', { oldPassword: oldPassword, newPassword: newPassword }).then(function (data) {
            message.textContent = data.error || data.message;
        });
    });

    document.getElementById('deleteButton').addEventListener('click', () => {
        if (!confirm("Supprimer définitivement ton compte ?")) {
            return;
        }
        appelApi('/api/deleteaccount').then(function (data) {
            if (data.error) {
                message.textContent = data.error;
                return;
            }
            deconnexion();
        });
    });

    // Affiche la liste des utilisateurs
    function chargerUtilisateurs() {
        fetch('/api/users', {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        }).then(function (res) {
            return res.json();
        }).then(function (data) {
            if (data.error) {
                return;
            }
            const liste = document.getElementById('listeUtilisateurs');
            liste.innerHTML = ""; // on vide la liste avant de la remplir

            data.users.forEach(function (user) {
                const li = document.createElement('li');
                li.textContent = user.username;
                liste.appendChild(li);
            });
        }).catch(function (err) {
            console.error(err);
        });
    }
}