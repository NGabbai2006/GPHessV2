function verifToken() {
    try {
        fetch("/api/veriftoken", {
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
                return console.log("test");
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
