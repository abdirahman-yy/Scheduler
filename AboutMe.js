
function date_calc() {
    var date = new Date(); 
    var userDate = new Date(document.getElementById("date").value);
    const d_ = 1000 * 60 * 60 * 24;
    const difference = Math.abs(date.getTime() - userDate.getTime());
    var day = Math.round(difference / d_);
    if (isNaN(day)) {
    document.getElementById("displayText").innerHTML = "Not a valid Date!";
    } else if (day == 0) { 
    document.getElementById("displayText").innerHTML = "0 days, that's tomorrow!";
    } else if (day < date.getTime() - userDate.getTime()){
    document.getElementById("displayText").innerHTML = "Already Happened!";
    } else {
    document.getElementById("displayText").innerHTML = day + " day(s) remaining...";
    }
}

function runFunction() {
    document.getElementById("date").addEventListener("input", date_calc);
}
