$(document).ready(function () {
    $("#tweet-text").on('blur keyup input', function () {
        const text = $("#tweet-text").val();
        const counter = 140 - text.length;
        $("#counter").text(counter);
        if (counter <= 0) {
            $("#counter").css({ "color": "#ff0000" })
        } else {
            $("#counter").css({ "color": "#545149" })
        }
    })
});