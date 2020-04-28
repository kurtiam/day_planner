const timeF = false;

const now = moment().format("MMMM Do YYYY");

let nowHour24 = moment().format("H");
let nowHour12 = moment().format("h");

if (timeF) {
    nowHour24 = 13;
    nowHour12 = 1;
}

let $dateHeading = $("#current-date");
$dateHeading.text(now);








let $contentDiv = $("#content");
$contentDiv.empty();