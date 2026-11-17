async function verifToken() {
    try {
        await fetch("/api/veriftoken", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }).then(function (res) {
            return res.json();
        }).then(function(data) {
            if (!data.valide) { // modifier pour mettre un code
                fetch("/api/deconnexion", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                })
                return window.location.replace("/connexion")
            } 
        }).catch(function (err) {
            console.error(err);
        });
    } catch {
        console.log(err);
        window.location.replace("/connexion");
    }
}
verifToken();

const deconnexion = document.getElementById("deconnexion");
const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const changePassword = document.getElementById("changePassword");
const deleteAccount = document.getElementById("deleteAccount");