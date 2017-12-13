chrome.commands.onCommand.addListener(function(command) { 
    if(command === "save-and-close"){
        // chrome.runtime.sendMessage({trigger: "save-and-close"});

        chrome.storage.sync.get({sessions: []}, function(arr){

            var session_name = prompt('Name for sessions?');

            if(session_name === null){
                session_name = "New Session";
            }

            var sessions = arr.sessions;


            chrome.windows.getLastFocused({"populate" : true}, function(window){
                sessions.unshift({name: session_name, tabArray: window.tabs, date: getFormattedDate()});
                chrome.storage.sync.set({'sessions': sessions});

                chrome.windows.remove(window.id);
            });

            chrome.windows.create();

        });

    }
});

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