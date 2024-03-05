function makeDot(x, y, r){
    let svgns = "http://www.w3.org/2000/svg",
        container = document.getElementById( 'svg-plot' );
    let circle = document.createElementNS(svgns, 'circle');
    circle.setAttributeNS(null, 'class', 'shot' );
    circle.setAttributeNS(null, 'cx', 150 + 30 * x);
    circle.setAttributeNS(null, 'cy', 150 - 30 * y);
    circle.setAttributeNS(null, 'r', 3);
    circle.setAttributeNS(null, 'style', 'fill: ' + isHit(x, y, r) + ';stroke-width: 0;' );
    container.appendChild(circle);
}

function isHit(x, y, r){
    if(isCircleZone(x, y, r) || isTriangleZone(x, y, r) || isRectangleZone(x, y, r)){
        return 'green';
    } else return 'red';
}

function isRectangleZone(x, y, r){
    return (x<=0) && (y<=0) && (x>=(-1)*r) && (y>=(-1)*r/2);
}
function isTriangleZone(x, y, r){
    return (x>=0) && (y<=0) && (y>=x-r/2);
}
function isCircleZone(x, y, r){
    return (x*x + y*y <= r*r) && (x>=0) && (y>=0);
}

function changingPlot() {
    let r = parseFloat(document.getElementById('form:value_R_hinput').value) * 30;
    $('#circleX_1').attr('cx', 150 - r);
    $('#circleX_2').attr('cx', 150 - r / 2);
    $('#circleX_3').attr('cx', 150 + r / 2);
    $('#circleX_4').attr('cx', 150 + r);
    $('#circleY_1').attr('cy', 150 - r);
    $('#circleY_2').attr('cy', 150 - r / 2);
    $('#circleY_3').attr('cy', 150 + r / 2);
    $('#circleY_4').attr('cy', 150 + r);
    $('#nameX_1').attr('x', 150 - r - 10);
    $('#nameX_2').attr('x', 150 + r - 5);
    $('#nameY_1').attr('y', 150 - r + 2.5);
    $('#nameY_2').attr('y', 150 + r + 2.5);
    $('#triangle').attr('points', (150 + r / 2) + ",150 150, " + (150 + r / 2) + " 150,150");
    $('#rectangle').attr('points', "150,150 150," + (150 + r / 2) + " " + (150 - r) + "," + (150 + r / 2) + " " + (150 - r) + ",150");
    $('#circle').attr('d', "M" + "150," + (150 - r) + " A" + r + "," + r + " 90 0,1 " + (150 + r) + ",150" + " L 150,150 Z");
}

function isValid(x, y, r){
    return (x >= -3 && x <= 5 && y >= -3 && y <= 5 && r >= 1 && r <= 3 && r % 0.5 == 0.);
}

function checkR(){
    let r = parseFloat(document.getElementById('form:value_R_hinput').value) * 30;
    if (!(r == 30 || r == 45 || r == 60 || r == 75 || r == 90)) {
        alert("Wrong R !!!");
    }
}

