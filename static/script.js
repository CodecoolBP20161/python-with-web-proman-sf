// need to implement the functions
function Board(board, title){
    this.type = board;
    this.title = title;
}


function StorageState(storage){
    this.storage = storage;

    this.changeStorage = function (storage) {
        this.storage = storage;
    };

    this.getData = function () {
        this.storage.getData()
    };

    this.saveData = function () {
        this.storage.saveData()
    };

    this.formatData = function () {
        this.storage.formatData()
    };
}


// need to implement the functions
function LocalStorage(){
    this.getData = function () {

    };

    this.saveData = function () {

    };

    this.formatData = function () {

    };
}

// need to implement the functions
$(document).ready(function () {
    $newBoard = $('.new_board');

    // list out existing boards from storage +title
    var listBoards = function () {

    };
    listBoards();

    // call popup
    $newBoard.click(function () {
        // need implement save button click new board (on popup)
    });

});
