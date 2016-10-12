var database = new StorageState(new apiHandler());

$(document).ready(function () {

    listBoards();


    //boards btn click
    $("#boards_btn").click(function () {
        listBoards();
    });


    // events on/for popup window    
    // open new card popup window
    $("#new_card_btn").click(function () {
        $(".popup2").dialog({show: 'fade'});
    });
    
    
    // open new board popup window
    $("#btn").click(function () {
        $(".popup").dialog({show: 'fade'});
    });


    // save board
    $("#save").click(saveBoard);


    // save card
    $('#save_card').click(saveCard);
});
