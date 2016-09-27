
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
