var servicePath = "Http://Localhost:7605/api/";

function getText(id, callBack) {
    $.ajax({
        type: "GET",
        url: servicePath + "TextType/" + id,
        cache: false,
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: 'json',
        success: function success(result) {
            callBack(result);
        }
    });
}

function setUserVote(customerVote) {
    $.ajax({
        type: "POST",
        url: servicePath + "customerVote",
        data: JSON.stringify(customerVote),
        cache: false,
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function success() {

        }
    });
}

function getAllCustomerVotes(callBack) {
    $.ajax({
        type: "GET",
        url: servicePath + "CustomerVote",
        cache: false,
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        dataType: 'json',
        success: function success(result) {
            callBack(result);
        }
    });
}