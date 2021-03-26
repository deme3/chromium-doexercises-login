window.addEventListener("load", () => {
    if(document.title === "DoExercises - PS") {
        var emailInput = document.getElementById("email_address");
        var studentIdInput = document.getElementById("matricola");
        var passwordInput = document.getElementById("password");
        
        chrome.runtime.sendMessage({action: "getStorage"}, function(response) {
            if(emailInput && studentIdInput && passwordInput) {
                emailInput.value = response.username;
                studentIdInput.value = response.student_id;
                passwordInput.value = response.password;
            }
         });
    }
});