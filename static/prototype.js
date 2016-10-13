function Card(title, boardID) {
    this.title = title;
    this.board = boardID;
}

function Board(title) {
    this.title = title;
}


function StorageState(storage) {
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

    this.modifyData = function (key, attribute, value) {
        return this.storage.modifyData(key, attribute, value)
    };

    this.deleteData = function (key) {
        return this.storage.deleteData(key);
    }
}


function LocalStorage(localStorage) {
    this.localStorage = localStorage;

    this.getData = function (key) {
        if (typeof key === 'undefined') {
            var entries = [];
            for (var i = 0; i < this.localStorage.length; i++) {
                entries.push(JSON.parse(this.localStorage[this.localStorage.key(i)]));
            }
            return entries;
        } else {
            return JSON.parse(this.localStorage.getItem(key));
        }

    };

    this.saveData = function (entry) {
        this.localStorage.setItem(String(entry.id), JSON.stringify(entry))
    };

    this.modifyData = function (key, attribute, value) {
        var data = JSON.parse(this.localStorage[key]);
        data[attribute] = value;
        this.localStorage[key] = JSON.stringify(data);
    };

    this.deleteData = function (key) {
        this.localStorage.removeItem(key);
    };
}

function apiHandler() {

    this.getData = function (dataID) {
        var response = '';
        if (typeof dataID === 'undefined') {
            $.ajax({
                url: "/api/boards",
                type: "GET",
                async: false,
                dataType: 'json',
                success: function (boards) {
                    response = boards;
                }
            });
        } else {
            $.ajax({
                url: "/api/boards/" + dataID,
                type: "GET",
                async: false,
                dataType: 'json',
                success: function (boardWithCards) {
                    response = boardWithCards;
                }
            });
        }
        return response
    };

    this.saveData = function (dataObj) {
        if(dataObj['table'] === 'board') {
            $.ajax({
                url: "/api/board-save",
                data: JSON.stringify(dataObj),
                type: "POST",
                async: false,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (boards) {
                    return boards
                }
            })
        } else if (dataObj['table'] === 'card') {
            $.ajax({
                url: "/api/card-save",
                data: JSON.stringify(dataObj),
                type: "POST",
                async: false,
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                success: function (boardWithCards) {
                    return boardWithCards
                }
            })
        }
    };

    this.deleteData = function (dataObj) {
        if(dataObj['table'] === 'board') {
            $.ajax({
                url: "/api/boards/" + dataObj['id'],
                type: "DELETE",
                async: false,
                dataType: 'json',
                success: function (boards) {
                    return boards
                }
            })
        } else if (dataObj['table'] === 'card') {
            $.ajax({
                url: "/api/cards/" + dataObj['id'],
                type: "DELETE",
                async: false,
                dataType: 'json',
                success: function (boardWithCards) {
                    return boardWithCards
                }
            })
        }
    };
    
    this.modifyData = function (dataObj) {
        $.ajax({
            url: "/api/cards/modify-entry",
            data: JSON.stringify(dataObj),
            type: "PUT",
            async: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                console.log(response)
            }
        })
       
    }
}
