function Card(title, id) {
    this.title = title;
    this.id = id;
}

function Board(title, id){
    this.title = title;
    this.id = id;
    this.cards = [];

    this.create_card = function (title) {
        var new_card_btn = new Card(title, this.cards.length)
        this.cards.push(new_card_btn)
    }
}


function StorageState(storage){
    this.storage = storage;

    this.changeStorage = function (storage) {
        this.storage = storage;
    };

    this.getData = function (key) {
        return this.storage.getData(key)
    };

    this.saveData = function (entry) {
        return this.storage.saveData(entry)
    };

    this.modifyData = function (key,attribute,value) {
        return this.storage.modifyData(key,attribute,value)
    };
}


function LocalStorage(localStorage){
    this.localStorage = localStorage;

    this.getData = function (key) {
        if (typeof key === 'undefined') {
            var entries = [];
            for(var i = 0; i < this.localStorage.length; i++) {
                entries.push(JSON.parse(this.localStorage[this.localStorage.key(i)]));
            }
            return entries;
        } else {
            return JSON.parse(this.localStorage.getItem(key));
        }

    };

    this.saveData = function (entry) {
        this.localStorage.setItem(String(this.localStorage.length), JSON.stringify(entry))
    };

    this.modifyData = function (key,attribute,value) {
        var data = JSON.parse(this.localStorage[key]);
        data[attribute] = value
        this.localStorage[key] = JSON.stringify(data);
    };
}

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
            var $current_board_id = $(this).attr('id')
            listCards($current_board_id)
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
                    $('.card_title').val("");
                    $(".popup2").dialog('close');
            });
        });
    };

    var listCards = function (key) {
        var cards = database.getData(key)['cards'];
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
        listBoards()
        location.reload();
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

});
