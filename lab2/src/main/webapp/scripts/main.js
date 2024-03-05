let x;
let y;
let r;
let prev = 1;

function formHandler(event){
    event.preventDefault();
    if (validateValues()){
        sendData();
    }
}

function validateValues(){
    let radioButtons = document.querySelectorAll('input[name="value_X"]');
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            x = radioButton.value;
            break;
        }
    }
    y = document.querySelector('input[name="value_Y"]').value.replace(",", ".");
    r = document.querySelector('option[name="value_R"]:checked').value;

    if ($.isNumeric(x) && $.isNumeric(y) && $.isNumeric(r) && y>(-1*5) && y<5){
        document.querySelector('.message').textContent = "";
        return true;
    }else document.querySelector('.message').textContent = " ERROR!";
    return false;
}

function sendData(){
    let timezone = new Date().getTimezoneOffset();
    console.log(timezone);
    let data = "r=" + encodeURIComponent(r) + "&x=" + encodeURIComponent(x) + "&y=" + encodeURIComponent(y) + "&timezone=" + encodeURIComponent(timezone);
    let xhr = new XMLHttpRequest();
    xhr.open("GET", document.URL + "controller?" + data, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // let table = document.querySelector('#result_table').getElementsByTagName('tbody')[0];
                // let newRow = table.insertRow(table.rows.length-1);
                // newRow.className = "results";
                // if (x == parseInt(x)) newRow.insertCell().outerHTML = "<th>" + parseInt(x) + ".00" + "</th>";
                // else newRow.insertCell().outerHTML = "<th>" + x + "</th>";
                // if (y == parseInt(y)) newRow.insertCell().outerHTML = "<th>"+ parseInt(y)  + ".00" + "</th>";
                // else newRow.insertCell().outerHTML = "<th>"+ y +"</th>";
                // if (r == parseInt(r))  newRow.insertCell().outerHTML = "<th>" + parseInt(r)  + ".00" + "</th>";
                // else newRow.insertCell().outerHTML = "<th>"+ r +"</th>";
                // console.log(xhr.response);
                // if (xhr.response.trim() == "true") newRow.insertCell().outerHTML = "<th style = 'color: green'>" + xhr.response.toUpperCase() +"</th>";
                // else newRow.insertCell().outerHTML = "<th style = 'color: red'>" + xhr.response.toUpperCase() +"</th>";
                makeDot();
                moveDot(r);
                window.location = document.URL + 'result.jsp';
            }
        }
    }
}

function svgHandler(event){
    const svg = document.querySelector('svg');
    const rect = svg.getBoundingClientRect();
    r = document.querySelector('option[name="value_R"]:checked').value;
    x = ((event.clientX-rect.left - 150)*(r/2)/50).toFixed(2);
    y = (((-1)*(event.clientY - rect.top - 150))*(r/2)/50).toFixed(2);
    sendData(x, y, r);
}

function makeDot(){
    let svgns = "http://www.w3.org/2000/svg",
        container = document.querySelector( 'svg' );
    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'class', 'shot' );
    circle.setAttributeNS(null, 'cx', 150 + 100 * x/r);
    circle.setAttributeNS(null, 'cy', 150 - 100 * y/r);
    circle.setAttributeNS(null, 'r', 3);
    circle.setAttributeNS(null, 'style', 'fill: red; stroke-width: 0;' );
    container.appendChild(circle);
}

function moveDots(){
    let cur = document.querySelector('option[name="value_R"]:checked').value;
    let shots = document.querySelectorAll( '.shot' );
    shots.forEach( (shot) => {
        let cx = shot.getAttribute('cx');
        let cy = shot.getAttribute('cy');
        shot.setAttributeNS(null, 'cx', (cx - 150)*prev/cur + 150);
        shot.setAttributeNS(null, 'cy', 150 - (150 - cy)*prev/cur);
        });
    prev = cur;
}

function moveDot(prev){
    let cur = 1;
    let shots = document.querySelectorAll(".shot")
    let cx = shots.item(shots.length-1).getAttribute('cx');
    let cy = shots.item(shots.length-1).getAttribute('cy');
    console.log(shots);
    console.log(cx, cy);
    shots.item(shots.length-1).setAttributeNS(null, 'cx', (cx - 150)*prev/cur + 150);
    shots.item(shots.length-1).setAttributeNS(null, 'cy', 150 - (150 - cy)*prev/cur);
}

function cleanTable(){
    let data2 = "clean_status=true";
    let xhr2 = new XMLHttpRequest();
    xhr2.open("GET", document.URL + "controller?" + data2, true);
    xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr2.send();
    xhr2.onreadystatechange = function () {
        if (xhr2.readyState === 4) {
            if (xhr2.status === 200) {
                window.location.reload();
            }
        }
    }
}


