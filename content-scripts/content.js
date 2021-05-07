function isundefined(x) { return typeof x === "undefined"; }

function isempty(x) { return x.trim() === ""; }

var failInterval = null,
    failures = 5;
const ATTEMPTS_INTERVAL = 500;
window.addEventListener("load", () => {
    // spaghetti
    console.debug("DoExercises AutoLogin attached successfully to onLoad Event");
    if (document.title === "DoExercises - PS") {
        console.debug(`DoExercises AutoLogin triggered: initiating repeating interval for`, 1 / ATTEMPTS_INTERVAL * 1000, `attempts per second`);

        failInterval = setInterval(() => {
            console.debug(`DoExercises AutoLogin: Attempt to login #${5 - failures + 1}`)
            var emailInput = document.getElementById("email_address");
            var studentIdInput = document.getElementById("matricola");
            var passwordInput = document.getElementById("password");
            var submitButton = document.getElementById("signin");

            chrome.runtime.sendMessage({ action: "getStorage" }, function(response) {
                let decoy = { student_id: response.student_id, username: response.username };
                console.debug("DoExercises Storage Worker's response", decoy);

                if (!isundefined(response.username) && !isundefined(response.student_id) && !isundefined(response.password) &&
                    !isempty(response.username) && !isempty(response.student_id) && !isempty(response.password) &&
                    emailInput && studentIdInput && passwordInput) {
                    emailInput.value = response.username;
                    studentIdInput.value = response.student_id;
                    passwordInput.value = response.password;
                    submitButton.click();
                    clearInterval(failInterval);
                    console.debug("%cLogin attempt successful", "color: green");
                } else {
                    console.debug("%cLogin failed", "color: red");
                    console.debug({
                        domComponents: {
                            email: emailInput,
                            studentId: studentIdInput,
                            password: passwordInput,
                            submit: submitButton
                        },
                        conditions: [
                            { condition: "Is response.username defined?", result: !isundefined(response.username) },
                            { condition: "Is response.student_id defined?", result: !isundefined(response.student_id) },
                            { condition: "Is response.password defined?", result: !isundefined(response.password) },
                            { condition: "Is response.username empty?", result: isempty(response.username) },
                            { condition: "Is response.student_id empty?", result: isempty(response.student_id) },
                            { condition: "Is response.password empty?", result: isempty(response.password) }
                        ],
                        workerResponse: decoy
                    });
                    if (failures > 0)
                        failures--;
                    else {
                        clearInterval(failInterval);
                        failures = 5;
                    }
                }
            });
        }, ATTEMPTS_INTERVAL);
    }
});