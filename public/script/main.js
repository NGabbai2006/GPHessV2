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