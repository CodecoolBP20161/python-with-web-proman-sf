function Card(title, id) {
    this.title = title;
    this.id = id;
}

function Board(title, id){
    this.title = title;
    this.id = id;
    this.cards = [];

    this.create_card = function (title) {
        // Need to implement
        // create new Card object and insert it to this.cards
    }
}


function StorageState(storage){
    this.storage = storage;

    this.changeStorage = function (storage) {
        this.storage = storage;
    };

    this.getData = function () {
        return this.storage.getData()
    };

    this.saveData = function (entry) {
        return this.storage.saveData(entry)
    };

    this.formatData = function () {
        return this.storage.formatData()
    };
}


function LocalStorage(localStorage){
    this.localStorage = localStorage;

    this.getData = function () {
        var entries = [];
        for(var i = 0; i < this.localStorage.length; i++) {
            entries.push(JSON.parse(this.localStorage[this.localStorage.key(i)]));
        }
        return entries;
    };

    this.saveData = function (entry) {
        this.localStorage.setItem(String(this.localStorage.length), JSON.stringify(entry))
    };

    this.formatData = function () {
        // didn't need to format in this case!
    };
}

$(document).ready(function () {
    var database = new StorageState(new LocalStorage(localStorage));
    $('.board').hide();
    // list out existing boards from storage
    var listBoards = function () {
        var board = database.getData().sort(function(a, b){
            return b['id'] - a['id'];
        });
        for(var i = 0; i < board.length; i++){
            $('<div>' + board[i]['title'] + '</div>').addClass('col-md-3 col-md-6 board_block').appendTo($('.board'));
        }
        $('.board').show('slow');
    };
    listBoards();

    //popup
    $(".popup").hide();

    $("#btn").click(function(){
        $(".popup").dialog({ show: 'fade' });
    });
    $("#save").click(function(){

        // use the save_entry!!
        // modify attributums (no type attr)

        var $board_title = $(".title").val();
        var new_board = new Board($board_title, localStorage.length);
        database.saveData(new_board);
        $('.title').val("");
        $(".popup").dialog('close');
        $('.board').empty();
        listBoards()
    });

    var save_entry = function (type) {
        // Need to implement
        // if new board (same as line 82>), if new card: solve it!
    }

    $('.col-md-3.col-md-6.board_block').click(function () {
        // need to implement (THIS.  !!!!!)
    })

    var listCards = function () {
        //need to implement (almost same as list boards)
    }


});
