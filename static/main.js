
$(document).ready(function () {
    var database = new StorageState(new LocalStorage(localStorage));

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
            $('<div>' + board[i]['title'] + '</div>').addClass('col-md-3 col-md-6 board_block')
                .attr('id', board[i]['id']).appendTo($('.board'));
        }
        $('.board').show('slow');

        //click on a board
        $('.col-md-3.col-md-6.board_block').click(function() {
            $('.board').hide();
            $('#btn').hide();
            $('#new_card_btn').show();
            $('#boards_btn').show();
            $current_board_id = $(this).attr('id')
            listCards($current_board_id)
        });
    };

    var listCards = function (key) {
        $('.card').empty();
        var cards = database.getData(key)['cards'].sort(function(a, b){
            return b['id'] - a['id'];
        });
        for(var i in cards){
            $('<div>' + cards[i]['title'] + '</div>').addClass('col-md-3 col-md-6 card_block').appendTo($('.card'));
        }
        $('.card').show('slow');
    };

    $('.board').hide();
    $(".popup").hide();
    $(".popup2").hide();
    listBoards()

    $("#btn").click(function() {
        $(".popup").dialog({show: 'fade'});
    });

    //boards btn click
    $("#boards_btn").click(function(){
        listBoards();
    });

    //popup save button
    $("#save").click(function(){
        var $board_title = $("#board_title").val();
        var new_board = new Board($board_title, localStorage.length);
        database.saveData(new_board);
        $('.title').val("");
        $(".popup").dialog('close');
        listBoards()
    });


    // save the newly created card to its parent board
    $("#new_card_btn").click(function() {
        $(".popup2").dialog({show: 'fade'});
    });

    $('#save_card').click(function(){
        var existing_cards = database.getData($current_board_id)['cards']
        $card_name = $('#card_title').val()
        var new_card_object = new Card($card_name, existing_cards.length)
        existing_cards.push(new_card_object)
        database.modifyData($current_board_id,'cards',existing_cards)
        $('#card_title').val("");
        $(".popup2").dialog('close');
        listCards($current_board_id);
    });

});
