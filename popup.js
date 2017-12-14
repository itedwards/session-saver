$(function(){
 
    chrome.storage.sync.get({sessions: []}, function(arr){
        var sessions = arr.sessions;

        console.log(JSON.stringify(sessions));

        for(var i = 0; i < sessions.length; ++i){

            $("#sessions-table").find('tbody')
                .append($('<tr class="clickable-row">')
                    .append($('<td class="open-session">')
                        .append($('<a href="#">').text(sessions[i].name))
                        .attr('id', sessions[i].id)
                    )
                    .append($('<td>').text(sessions[i].date)
                    )
                    .append($('<td>').text(Object.keys(sessions[i].tabArray).length)
                    )
                    .append($('<td class="trash-link">')
                        .append($('<a href="#">')
                            .attr('id', sessions[i].id)
                            .append($('<img class="trash-can">')
                                .attr('src', 'trash.svg')
                                .attr('alt', 'trash')
                            )
                        )
                    )
                    .attr('id', sessions[i].id)
                    
                );
        }
    });

    $('#clear').click(function(event){
        chrome.storage.sync.clear(function(){
            $("#sessions-table > tbody").html("");
        });
    })

    $('tbody').on('click','.open-session', function(){
        var currId = $(this).attr('id');
        chrome.storage.sync.get({sessions: []}, function(arr){

            var sessions = arr.sessions;

            for(var i = 0; i < sessions.length; ++i){
                if(sessions[i].id === currId){
                    var tabs = sessions[i].tabArray;
                    var toOpen = [];
                    for(var j = 0; j < tabs.length; ++j){
                        toOpen.push(tabs[j].url);
                    }
                    chrome.windows.create({url: toOpen});
                    break;
                }
            }

        });
    });

    $('tbody').on('click','.trash-link', function(){
        var currId = $(this).attr('id');
        chrome.storage.sync.get({sessions: []}, function(arr){

            var sessions = arr.sessions;

            for(var i = 0; i < sessions.length; ++i){
                if(sessions[i].id === currId){
                    sessions.splice(i, 1);
                    break;
                }
            }

            chrome.storage.sync.set({'sessions': sessions});
        });

        $('table#sessions-table tr#' + currId).remove();
    });

    function deleteSession(id){
        alert("deleting");
        chrome.storage.sync.get({sessions: []}, function(arr){

            var sessions = arr.sessions;

            for(var i = 0; i < sessions.length; ++i){
                if(sessions[i].id === id){
                    sessions.splice(i, 1);
                    break;
                }
            }

            chrome.storage.sync.set({'sessions': sessions});
        });

        $('table#sessions-table tr#' + id).remove();

    }

    function openSession(id){

    }


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