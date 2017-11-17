$(function(){

    /*chrome.storage.sync.get({sessions: []}, function(arr){
        var sessions = arr.sessions.sessions;
        console.log(sessions.length);
        for(int i = 0; i < sessions.length; ++i){
            var new_task = $("<li><a></a></li>").addClass('task');
            new_task.text(sessions[i].name + " - " + sessions[i].date); 
            new_task.appendTo('ul.list');
        }
    })*/


    $('#new-session').click(function(event){
        if($('#name').val() !== ""){
            chrome.storage.sync.get({sessions: []}, function(arr){

                var sessions = arr.sessions;

                var new_session = {
                    name: $('#name').val(),
                    url: "",
                    date: getFormattedDate()
                };

                sessions.push(new_session);

                chrome.storage.sync.set({'sessions': sessions});

                console.log(sessions);


                var new_task = $("<li><a></a></li>").addClass('task');
                new_task.text(new_session.name + " - " + new_session.date); 
                new_task.appendTo('ul.list');
            });
        }
        else{
            $('#invalid').text( 'Not valid!').show().fadeOut( 2000 );
        }
    })
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