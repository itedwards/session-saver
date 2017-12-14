$(function(){
 
    chrome.storage.sync.get({sessions: []}, function(arr){
        var sessions = arr.sessions;

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
                    /*.append($('<td class="trash-link">')
                        .append($('<a href="#">')
                            .attr('id', sessions[i].id)
                            .append($('<img class="trash-can">')
                                .attr('src', 'trash.svg')
                                .attr('alt', 'trash')
                            )
                        )
                    )*/
                    .append($('<td class="trash-link">')
                        .append($('<a href="#">').text("Delete"))
                        .attr('id', sessions[i].id)
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