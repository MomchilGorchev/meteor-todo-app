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
};

// Prettify Date
Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).calendar();
});

