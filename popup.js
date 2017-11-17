$(function(){
    $('#new-session').submit(function(event){
        if($('#name').val() !== ""){
            $('#new-session-name').html($('#name').val());
            event.preventDefault();
            return;
        }

        $('#invalid').text( 'Not valid!').show().fadeOut( 2000 );
        event.preventDefault();
    })
})