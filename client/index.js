$(document).ready(function() {
    $('.temp').on('click', function() {
      $.ajax({
          url: '/weather',
          dataType: 'json',
          success: function(data) {
             console.log(data);
             $('.temp').append('Day: ' + data.day + ' | High: ' + data.high + ' | Low: ' + data.low);
          }
      });
    });

    $('.soccer').on('click', function(){
      $.ajax({
          url: '/soccer',
          dataType: 'json',
          success: function(data) {
             console.log(data);
             $('.soccer').append('Team: ' + data.team + ' | Goal Difference: ' + data.goalDifference);
          }
      });
    });
});
