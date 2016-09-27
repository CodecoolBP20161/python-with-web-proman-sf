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
function LocalStorage(localStorage){
    this.localStorage = localStorage;

    this.getData = function () {
        var entries = [];
        for(var i = 0; i < this.localStorage.length; i++){
            entries.push(this.localStorage.getItem(this.localStorage.key[i]));
        }
        return entries
    };

    this.saveData = function (entry) {
        this.localStorage.setItem(entry, JSON.stringify(entry))
    };

    this.formatData = function () {
        // didn't need to format in this case!
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
