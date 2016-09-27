function Board(title){

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


function LocalStorage(){
    this.getData = function () {

    };

    this.saveData = function () {

    };

    this.formatData = function () {

    };
}