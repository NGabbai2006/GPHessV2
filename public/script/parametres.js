const deconnexion = document.getElementById("deconnexion");
const oldPassword = document.getElementById("oldPassword");
const newPassword = document.getElementById("newPassword");
const changePassword = document.getElementById("changePassword");
const deleteAccount = document.getElementById("deleteAccount");

cookieStore.get("tokfen").then((result) => {
    if (!result) window.location.href = '/inscription';
})