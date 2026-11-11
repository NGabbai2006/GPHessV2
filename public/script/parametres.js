async function verifToken() {
    const cookie = await cookieStore.get("authToken");
    if (!cookie) return window.location.replace("/connexion");

    try {
        const reponse = await fetch("/api/veriftoken", {
            headers: { "Authorization": `Bearer ${cookie.value}` }
        })

        if (!reponse.ok) {
            await cookieStore.delete("token");
            return window.location.replace("/connexion")
        }
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