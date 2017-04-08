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

            $.post('https://api.telegram.org/bot349061307:AAH2s3gMeu-LFIoNE-fVWvlgK1pfLUjYlQY/setGameScore?user_id=' + getParameterByName('userId')
                + '&score=' + parseInt($("#score").text())
                + '&inline_message_id=' + getParameterByName('inlineMessageId')
                , function(data){
                    console.log(data);
                });
        }
    }, 100);
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

    $("#clickme").html($("#clickme").text() + '<br />' + getParameterByName('name') + '!')
});

function getParameterByName( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}
