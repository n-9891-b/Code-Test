$(document).ready(function(){
    $.ajax({
        url: '/weather',
        dataType: 'text',
        success: function(text) {
           // $('#table').append(text); // refresh every 30 seconds
           console.log(text);
           //this is a change
        }
    })
});
