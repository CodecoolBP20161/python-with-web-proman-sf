function Card(title, id) {
    this.title = title;
    this.id = id;
}

function Board(title, id) {
    this.title = title;
    this.id = id;
    this.cards = [];

    this.create_card = function (title) {
        var new_card_btn = new Card(title, this.cards.length);
        this.cards.push(new_card_btn)
    }
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

    this.getData = function (data_id) {
        var response = '';
        if (typeof data_id === 'undefined') {
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
                url: "/api/boards/" + data_id,
                type: "GET",
                async: false,
                dataType: 'json',
                success: function (board_with_cards) {
                    response = board_with_cards;
                }
            });
        }
        return response
    };

    this.saveData = function () {

    };

    this.modifyData = function () {

    };

    this.deleteData = function (data_id) {
        $.ajax({
            url: "/api/boards/" + data_id,
                type: "DELETE",
                async: false,
                dataType: 'json',
                success: function (boards) {
                    return boards
                }
        })

    };
}