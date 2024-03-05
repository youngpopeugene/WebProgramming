function validateX() {
    let x_values = document.getElementById("x_values");
    let xError = document.getElementById("x_error");

    if (x_values.selectedIndex === 0) {
        xError.innerHTML = "You need to choose the value X!";
        return false;
    } else {
        xError.innerHTML = "";
        return true;
    }
}

function validateXMobile() {
    let x_values = document.getElementById("x_values-mobile");
    let xError = document.getElementById("x_error");

    if (x_values.selectedIndex === 0) {
        xError.innerHTML = "You need to choose the value X!";
        return false;
    } else {
        xError.innerHTML = "";
        return true;
    }
}



function validateY(y) {
    let yError = document.getElementById('y_error');
    let allRightY;
    if (y !== null && y !== "") {
        if (/^(0$|-?[0-9]\d*(\.\d*[0-9]$)?|-?0\.\d*[0-9])$/.test(y)) {
            if ((Number(y) > -3) && (Number(y) < 5)) {
                yError.innerHTML = "";
                allRightY = true;
            } else {
                yError.innerHTML = "Y can take value in the range (-3 ... 5)!";
                allRightY = false;
            }
        } else {
            yError.innerHTML = "Value must be a number!";
            allRightY = false;
        }
    } else {
        yError.innerHTML = "Value cannot be empty!";
        allRightY = false;
    }
    return allRightY;
}


export function validation(yValue) {
    let xRes = validateX();
    let yRes = validateY(yValue);
    return xRes && yRes;
}

export function validationMobile(yValue) {
    let xRes = validateXMobile();
    let yRes = validateY(yValue);
    return xRes && yRes;
}