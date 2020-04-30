$(document).ready(function () {
    const timeF = false;

    const now = moment().format("MMMM Do YYYY");

    let nowHour24 = moment().format("H");
    let nowHour12 = moment().format("h");

    if (timeF) {
        nowHour24 = 13;
        nowHour12 = 1;
    }

    let $currentDate = $("#current-date");
    $currentDate.text(now);

    let savedInfo = JSON.parse(localStorage.getItem("savedInfo"));

    if (timeF) { console.log(savedInfo); }

    if (savedInfo !== null) {
        planTextArr = savedInfo;
    }
    else {
        planTextArr = new Array(9);
        planTextArr[4] = "test info";
    }

    if (timeF) { console.log("full array of plned text", planTextArr); }

    let $plannerDiv = $("#content");

    $plannerDiv.empty();




    if (timeF) { console.log("current time", nowHour12); }
    for (let hour = 9; hour <= 17; hour++) {
        let index = hour - 9;

        let $rowDiv = $("<div>");
        $rowDiv.addClass("row");
        $rowDiv.addClass("plannerRow");
        $rowDiv.attr("hour-index", hour);

        let $col2TimeDiv = $("<div>");
        $col2TimeDiv.addClass("col-md-10");

        const $timeBoxSpn = $("<span>");

        $timeBoxSpn.attr("class", "timeBox");

        let displayHour = 0;
        let ampm = "";
        if (hour > 12) {
            displayHour = hour - 12;
            ampm = "pm";
        } else if

            (hour == 12) {
            displayHour = hour;
            ampm = "pm";

        } else {
            displayHour = hour;
            ampm = "am";
        }

        $timeBoxSpn.text(`${displayHour} ${ampm}`);

        $rowDiv.append($col2TimeDiv);
        $col2TimeDiv.append($timeBoxSpn);

        let $dailyPlanSpn = $("<input>");

        $dailyPlanSpn.attr("id", `input-${index}`);
        $dailyPlanSpn.attr("hour-index", index);
        $dailyPlanSpn.attr("type", "text");
        // $dailyPlanSpn.attr("span", "contenteditable = 'true'");
        // ^^ not working trying to get the text to exapnd to a 2nd row if needed 
        $dailyPlanSpn.attr("class", "dailyPlan");

        $dailyPlanSpn.val(planTextArr[index]);

        let $col9IptDiv = $("<div>");
        $col9IptDiv.addClass("col-md-9");

        $rowDiv.append($col9IptDiv);
        $col9IptDiv.append($dailyPlanSpn);

        let $col1SaveDiv = $("<div>");
        $col1SaveDiv.addClass("col-md-9");

        let $saveBtn = $("<i>");
        $saveBtn.attr("id", `saveid-${index}`);
        $saveBtn.attr("save-id", index);
        $saveBtn.attr("class", "far fa-save saveIcon");

        $rowDiv.prepend($col1SaveDiv);
        $col1SaveDiv.append($saveBtn);

        updateRowColor($rowDiv, hour);

        $plannerDiv.append($rowDiv);

    };

    // trying to add current time to blink - not working 
    function updateRowColor($hourRow, hour) {

        function blink_text() {
            $('.blink').fadeOut(500);
            $('.blink').fadeIn(500);
        }

        if (timeF) { console.log("rowColor ", nowHour24, hour); }

        if (hour < nowHour24) {
            if (timeF) { console.log("lessThan"); }
            $hourRow.css("background", "red")
            $hourRow.css("border", "solid .1px black");
            $hourRow.css('opacity', 0.8);
        } else if (hour > nowHour24) {
            if (timeF) { console.log("greaterthan"); }
            $hourRow.css("color", "magenta")
            // $hourRow.css('opacity', 0.9);
        } else {
            if (timeF) { console.log("eqaul"); }
            // $hourRow.css("color", "green")
            // $hourRow.css("color", blink_text);
            $hourRow.css("background", "green");
            $hourRow.css('opacity', 0.85);
        }
    };




    $(document).on("click", "i", function (event) {
        event.preventDefault();

        if (timeF) { console.log("click pta before" + planTextArr); }

        let $index = $(this).attr("save-id");

        let inputId = "#input-" + $index;
        let $value = $(inputId).val();

        planTextArr[$index] = $value;

        if (timeF) { console.log("value ", $value); }
        if (timeF) { console.log("index ", $index); }
        if (timeF) { console.log("click pta after " + planTextArr); }

        localStorage.setItem("savedInfo", JSON.stringify(planTextArr));
    });


    $(document).on("change", "input", function (event) {
        event.preventDefault();
        if (timeF) { console.log("onChange"); }
        if (timeF) { console.log("id", $(this).attr("hour-index")); }

        let i = $(this).attr("hour-index");

        $(`#saveid-${i}`).addClass("shadowPulse");
    });



});
