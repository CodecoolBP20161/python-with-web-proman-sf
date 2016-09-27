$(document).ready(function() {
    $(".popup").hide();

    $("#btn").click(function(){
        $(".popup").dialog();
    });
    $("#save").click(function(){
        var $board_title = $(".title").val()
        $(".board").append("<p class=\"text-center\">" + $board_title + "</p>")
         $('.title').val("");
        $(".popup").dialog('close');
    });
});
