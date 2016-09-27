
function Board(board, title){
    this.type = board;
    this.title = title;
}


function StorageState(storage){
    this.storage = storage;
    this.localStorage = storage.localStorage;

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

    // list out existing boards from storage +title
    var listBoards = function () {
        var board = database.getData();
        for(var i = 0; i < board.length; i++){
            if(board[i]['type'] === 'board') {
                $('<div>' + board[i]['title'] + '</div>').addClass('col-md-3').appendTo($('.board'))
            }
        }
    };
    listBoards();

    //popup
    $(".popup").hide();

    $("#btn").click(function(){
        $(".popup").dialog();
    });
    $("#save").click(function(){
        var $board_title = $(".title").val();
        var new_board = new Board("board",$board_title);
        database.saveData(new_board);
        $('.title').val("");
        $(".popup").dialog('close');
        $('.board').empty();
        listBoards();
    });
});



