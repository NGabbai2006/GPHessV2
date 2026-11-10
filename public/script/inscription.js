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