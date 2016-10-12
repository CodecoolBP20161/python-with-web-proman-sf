
var listCards = function (key) {
    $('.board').hide();
    $('#btn').hide();
    $('#new_card_btn').show();
    $('#boards_btn').show();

    $('.card').empty();
    var cards = database.getData(key)['cards'].sort(function (a, b) {
        return b['id'] - a['id'];
    });
    for (var i in cards) {
        $('<div></div>').addClass('col-md-3').attr('id', 'card' + cards[i]['id']).appendTo($('.card'));
        $('<div>' + cards[i]['title'] + '</div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 card_block')
            .attr('id', 'card_title' + cards[i]['id']).appendTo($('#card' + cards[i]['id']));
        $('<div></div>').addClass('col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right card_span')
            .attr('id', 'delete_card' + cards[i]['id']).appendTo($('#card_title' + cards[i]['id']));
        $('<span></span>').addClass('glyphicon glyphicon-remove-circle card_del').attr('id', cards[i]['id'])
            .appendTo($('#delete_card' + cards[i]['id']));
    }
    $('.card').show('slow');


    // delete card
    $('.glyphicon.glyphicon-remove-circle.card_del').click(deleteCard);
};


// event when click on card's delete glyphicon
var deleteCard = function (event) {
    event.stopPropagation();
    $to_delete = $(this).attr('id');
    $("#card" + $to_delete).hide();
    database.deleteData({'id': $to_delete, 'table': 'card'});
};


// need to correct after Tami's push
// saving new card
var saveCard = function () {
    $cardName = $('#card_title').val();
    var newCardObject = new Card($cardName, $current_board_id);
    newCardObject.table = 'card';
    database.saveData(newCardObject);
    $('#card_title').val("");
    $(".popup2").dialog('close');
    listCards($current_board_id);
};