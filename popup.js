$(function(){
 
    chrome.storage.sync.get({sessions: []}, function(arr){
        var sessions = arr.sessions;

        for(var i = 0; i < sessions.length; ++i){

            $("#sessions-table").find('tbody')
                .append($('<tr class="clickable-row">')
                    .append($('<td>').text(sessions[i].name)
                    )
                    .append($('<td>').text(sessions[i].date)
                    )
                    .append($('<td>').text(Object.keys(sessions).length)
                    )
                    .append($('<td>')
                        .append($('<img class="trash-can">')
                            .attr('src', 'trash.svg')
                            .attr('alt', 'trash'))
                    )
            );
        }
    })

    $('#clear').click(function(event){
        chrome.storage.sync.clear(function(){
            $("#sessions-table > tbody").html("");
        });
    })

    /*$('#new-session').click(function(event){
        if($('#name').val() !== ""){
            chrome.storage.sync.get({sessions: []}, function(arr){

                var sessions = arr.sessions;

                var new_session = {
                    name: $('#name').val(),
                    url: "",
                    date: getFormattedDate()
                };

                sessions.unshift(new_session);

                chrome.storage.sync.set({'sessions': sessions});

                console.log(sessions);

                var new_name = $("<td></td>");
                var new_date = $("<td></td>");
                new_name.text(new_session.name); 
                new_date.text(new_session.date);

                var new_row = $("<tr>" + new_name + new_date + "</tr>");

                new_row.appendTo('tbody.list');
            });
        }
        else{
            $('#invalid').text( 'Not valid!').show().fadeOut( 2000 );
        }
    })*/

    /*$(document).bind('keydown', 'ctrl+n', function(){
        chrome.windows.getCurrent(true, function(window){
            chrome.storage.sync.get({sessions: []}, function(arr){

                var sessions = arr.sessions;

                var new_session = {
                    name: "$('#name').val()",
                    tabs: window.tabs,
                    date: getFormattedDate()
                };

                sessions.unshift(new_session);

                chrome.storage.sync.set({'sessions': sessions});

                console.log(sessions);

                var new_name = $("<td></td>");
                var new_date = $("<td></td>");
                new_name.text(new_session.name); 
                new_date.text(new_session.date);

                var new_row = $("<tr>" + new_name + new_date + "</tr>");

                new_row.appendTo('tbody.list');

            });

            chrome.windows.close();
        });
    })*/
})



function getFormattedDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if(dd < 10){
        dd = '0' + dd;
    } 
    if(mm < 10){
        mm = '0' + mm;
    } 
    var today = mm + '/' + dd + '/' + yyyy;

    return today;
}