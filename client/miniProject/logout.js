function fnLogout() {
    if(!confirm("Do you confirm logout? Make sure to save your projects.")){
        return;
    }
    sessionStorage.removeItem("sessionId");
    location.href = "Intro-page.html"; // redirect to login page
}