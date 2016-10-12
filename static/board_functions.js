var listBoards = function () {
    $('.card').hide();
    $('#new_card_btn').hide();
    $('#boards_btn').hide();
    $('#btn').show();

    $('.board').empty();
    var board = database.getData().sort(function (a, b) {
        return b['id'] - a['id'];
    });
    for (var i = 0; i < board.length; i++) {
        $('<div></div>').addClass('col-md-3').attr('id', 'board' + board[i]['id']).appendTo($('.board'));
        $('<div>' + board[i]['title'] + '</div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 board_block')
            .attr('id', board[i]['id']).appendTo($('#board' + board[i]['id']));
        $('<div></div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right')
            .attr('id', 'delete').appendTo($('#' + board[i]['id']));
        $('<span></span>').addClass('glyphicon glyphicon-remove-circle').attr('id', board[i]['id'])
            .appendTo($('#' + board[i]['id'] + '> div'));
    }
    $('.board').show('slow');


    //events on boards
    //delete board
    $('.glyphicon.glyphicon-remove-circle').click(deleteBoard);


    //click on a board
    $('.col-xs-12.col-sm-12.col-md-12.col-lg-12.board_block').click(clickOnBoard);
};


// list cards when clicking on board
var clickOnBoard = function () {
    var $current_board_id = $(this).attr('id');
    listCards($current_board_id)
};


// event when click on board's delete glyphicon
var deleteBoard = function (event) {
    event.stopPropagation();
    $id_to_delete = $(this).attr('id');
    $('#board' + $id_to_delete).hide('slow');
    database.deleteData({'id': $id_to_delete, 'table': 'board'});
};


// saving new board
var saveBoard = function () {
    var $board_title = $("#board_title").val();
    var new_board = new Board($board_title);
    new_board.table = 'board';
    database.saveData(new_board);
    $('.title').val("");
    $(".popup").dialog('close');
    listBoards()
};
