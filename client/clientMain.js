/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Client side collections and stuff
 */
Messages = new Meteor.Collection("messages");
Meteor.subscribe('messages');

// Return only not-completed todo-s
Template.app.messages = function() {
   return Messages.find({status: 'not-done'}, {sort: {createdAt: -1}});
//  Timestamp handling
//    var timeNow ={
//        hours: parseInt(moment().format('HH')),
//        mins: parseInt(moment().format('mm'))
//    }
//
//    console.log(msgs.collection._docs._map);
//    var actualTodos = msgs.collection._docs._map;
//    $.each(actualTodos, function(key, value){
//       var itemDeadline = this.dueDate.split('-');
//       var dueDate = {
//           day: parseInt(itemDeadline[0]),
//           month: parseInt(itemDeadline[1]),
//           year: parseInt(itemDeadline[2])
//       };
//       console.log(dueDate);
//       if(yyyy > dueDate.year){
//           //TODO
//           // update msg to 'outdated'
//           console.log('msg old');
//       }
//       else if(yyyy == dueDate.year){
//           if(mm > dueDate.month){
//               //TODO
//               // update msg to 'outdated'
//               console.log('msg old');
//           }
//           else if(mm == dueDate.month) {
//               if(dd > dueDate.day){
//                   //TODO
//                   // update msg to 'outdated'
//                   console.log('msg old');
//               }
//               else if(dd == dueDate.day){
//                   console.log('Today is the day!');
//               }
//           }
//       } else {
//           if(mm > dueDate.month){
//               //TODO
//               // update msg to 'outdated'
//               console.log('msg old');
//           }
//           else if(mm == dueDate.month) {
//               if(dd > dueDate.day){
//                   //TODO
//                   // update msg to 'outdated'
//                   console.log('msg old');
//               }
//               else if(dd == dueDate.day){
//                   console.log('Today is the day!');
//
//               }
//           }
//       }
//    });
    //return msgs;
};
// Return only completed todo-s
Template.app.messagesCompleted = function() {
    return Messages.find({status: 'completed'}, {sort: {createdAt: -1}});
};

// App .rendered function
Template.app.rendered = function(){

    $('.datepicker').datepicker({
      dateFormat: 'dd-mm-yy',
      altField: '#due-date',
      inline: true,
      showOtherMonths: true,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    });

    $('textarea').hover(function(){
        $(this).siblings('.custom-tooltip').fadeIn('fast');
    },
    function(){
        $(this).siblings('.custom-tooltip').fadeOut('fast');
    });
    var tabs = $('#tabs').tabs();
    tabs.find( ".ui-tabs-nav" ).sortable({
        axis: "x",
        stop: function() {
            tabs.tabs( "refresh" );
        }
    });
};

// Prettify Date
Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).calendar();
});

