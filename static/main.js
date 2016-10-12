
$(document).ready(function () {
    var database = new StorageState(new apiHandler());

    var get_board_id = function(array){
        if(array.length > 0){
            var myArr = [];
            for (var i in array){
                myArr.push(array[i]["id"])
            }

            return Math.max(...myArr)+1;
        }else{
            return 0
        }
    };

    var listBoards = function () {
        $('.card').hide();
        $('#new_card_btn').hide();
        $('#boards_btn').hide();
        $('#btn').show();
        $('.board').empty();

        var board = database.getData().sort(function(a, b){
            return b['id'] - a['id'];
        });
        for(var i = 0; i < board.length; i++){
            $('<div></div>').addClass('col-md-3').attr('id', 'board' + board[i]['id']).appendTo($('.board'));
            $('<div>' + board[i]['title'] + '</div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 board_block')
                .attr('id', board[i]['id']).appendTo($('#board' + board[i]['id']));
            $('<div></div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right')
                .attr('id', 'delete').appendTo($('#' + board[i]['id']));
            $('<span></span>').addClass('glyphicon glyphicon-remove-circle').attr('id', board[i]['id'])
                .appendTo($('#' + board[i]['id'] + '> div'));
        }
        $('.board').show('slow');
        $('h3').hide()

        //delete board
        $('.glyphicon.glyphicon-remove-circle').click(function (event) {
            event.stopPropagation();
            $id_to_delete = $(this).attr('id');
            $('#board' + $id_to_delete).hide();
            database.deleteData({'id': $id_to_delete, 'table': 'board'});
        });

        //click on a board
        $('.col-xs-12.col-sm-12.col-md-12.col-lg-12.board_block').click(function(event) {
            // $(event.target).hasClass()
            $('.board').hide();
            $('#btn').hide();
            $('#new_card_btn').show();
            $('#boards_btn').show();
            $current_board_id = $(this).attr('id')
            listCards($current_board_id)
        });
    };

    var listCards = function (key) {
        $('h3').show()
        var boardTitle = database.getData($current_board_id)['title'];
        $('h3').html(boardTitle).data("board_id", $current_board_id)

        $('.card').empty();
        var cards = database.getData(key)['cards'].sort(function(a, b){
            return b['id'] - a['id'];
        });
        for(var i in cards){
            $('<div></div>').addClass('col-md-3').attr('id', 'card' + cards[i]['id']).appendTo($('.card'));
            $('<div>' + cards[i]['title'] + '</div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 card_block')
                .attr('id', 'card_title' + cards[i]['id']).appendTo($('#card' + cards[i]['id']));
            $('<div></div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right card_span')
                .attr('id', 'delete_card' + cards[i]['id']).appendTo($('#card_title' + cards[i]['id']));
            $('<span></span>').addClass('glyphicon glyphicon-remove-circle card_del').attr('id', cards[i]['id'])
                .appendTo($('#delete_card' + cards[i]['id']));
        }

        $('.card').show('slow');



        // delete card
        $('.glyphicon.glyphicon-remove-circle.card_del').click(function(event){
            event.stopPropagation();
            $to_delete = $(this).attr('id');
            $("#card" + $to_delete).hide();
            database.deleteData({'id': $to_delete, 'table': 'card'});
        });
    };


    $('.board').hide();
    $(".popup").hide();
    $(".popup2").hide();
    listBoards();


    $("#btn").click(function() {
        $(".popup").dialog({show: 'fade'});
    });

    //boards btn click
    $("#boards_btn").click(function(){
        listBoards();
    });


    // save board
    $("#save").click(function(){
        var $board_title = $("#board_title").val();
        var new_board = new Board($board_title);
        new_board.table = 'board';
        database.saveData(new_board);
        $('.title').val("");
        $(".popup").dialog('close');
        listBoards()
    });


    // save the newly created card to its parent board
    $("#new_card_btn").click(function() {
        $(".popup2").dialog({show: 'fade'});
    });

    // save card
    $('#save_card').click(function(){
        $cardName = $('#card_title').val();
        var newCardObject = new Card($cardName, $current_board_id);
        newCardObject.table = 'card';
        database.saveData(newCardObject);
        $('#card_title').val("");
        $(".popup2").dialog('close');
        listCards($current_board_id);
    });

});
