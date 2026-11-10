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