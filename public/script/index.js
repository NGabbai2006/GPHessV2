function verifToken() {
    try {
        fetch("/api/veriftoken", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }).then(function (res) {
            return res.json();
        }).then(function(data) {
            if (!data.valide) {
                fetch("/api/deconnexion", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" }
                })
                return;
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
