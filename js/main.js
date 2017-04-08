function startTimer(duration, display) {

    var timer = duration;
    var minutes;
    var seconds;

    var interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        --timer;
        if (timer < 0) {
            timer = 0;
            clearInterval(interval);
            $("#button").off('click');
            $("#congrats").show();
        }
    }, 1000);
}

$(function(){
    var countdown = 30;
    var display = $('#timer');
    var timerStarted = false;

    $("#congrats").hide();

    $("#button").click(function(event){
       $("#score").text(parseInt($("#score").text()) + 1);

        if(!timerStarted) {
            timerStarted = true;
            startTimer(countdown, display);
        }

    });
});
