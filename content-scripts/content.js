function isundefined(x) {return typeof x === "undefined";}
function isempty(x) {return x.trim() === "";}
window.addEventListener("load", () => {
    // spaghetti
    if(document.title === "DoExercises - PS") {
        var emailInput = document.getElementById("email_address");
        var studentIdInput = document.getElementById("matricola");
        var passwordInput = document.getElementById("password");
        var submitButton = document.getElementById("signin");
        
        chrome.runtime.sendMessage({action: "getStorage"}, function(response) {

            if(!isundefined(response.username) && !isundefined(response.student_id) && !isundefined(response.password)
            && !isempty(response.username) && !isempty(response.student_id) && !isempty(response.password)
            && emailInput && studentIdInput && passwordInput) {
                emailInput.value = response.username;
                studentIdInput.value = response.student_id;
                passwordInput.value = response.password;
                submitButton.click();
            }
         });
    }
});