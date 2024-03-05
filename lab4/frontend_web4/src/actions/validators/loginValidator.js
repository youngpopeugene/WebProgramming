function containsWhitespace(str) {
    return /\s/.test(str);
}

function validateLogin(username, errorId) {
    let usernameError = document.getElementById(errorId);
    if (containsWhitespace(username)){
        usernameError.innerHTML = "Whitespaces is unacceptable";
        return false;
    }
    if(username.trim().length >= 18){
        usernameError.innerHTML = "Login is too long";
        return false;
    }
    if(username.trim().length <= 6){
        usernameError.innerHTML = "Login is too short";
        return false;
    }
    usernameError.innerHTML = "";
    return true;
}

function validatePassword(password, errorId) {
    let passwordError = document.getElementById(errorId);
    if (containsWhitespace(password)){
        passwordError.innerHTML = "Whitespaces is unacceptable";
        return false;
    }
    if(password.trim().length >= 18){
        passwordError.innerHTML = "Password is too long";
        return false;
    }
    if(password.trim().length <= 6){
        passwordError.innerHTML = "Password is too short";
        return false;
    }
    passwordError.innerHTML = "";
    return true;
}

export function validation(username, usernameErr, password, passErr) {
    let usernameRes = validateLogin(username, usernameErr);
    let passwordRes = validatePassword(password, passErr);
    return usernameRes && passwordRes;
}