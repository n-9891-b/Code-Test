$(document).ready(function() {

    $('.temp').on('click', function() {
      $('.temp').off('click');
      $.ajax({
          url: '/weather',
          dataType: 'json',
          success: function(data) {
             var html = '<p class="result">Day: ' + data.day + '</p><p class="result">High: ' + data.high + '</p><p class="result">Low: ' + data.low + '</p>';
             $('.temp').append(html);
          }
      });
    });

    $('.soccer').on('click', function(){
      $('.soccer').off('click');
      $.ajax({
          url: '/soccer',
          dataType: 'json',
          success: function(data) {
             var team = data.team.replace('_', ' ');
             var html = '<p class="result">Team: ' + team + '</p><p class="result">Goal Difference: ' + data.goalDifference + '</p>';
             $('.soccer').append(html);
          }
      });
    });

});
