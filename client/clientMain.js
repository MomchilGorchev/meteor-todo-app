/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Client side collections and stuff
 */
//themes = {
//    "default": "//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css",
//    "amelia" : "//bootswatch.com/amelia/bootstrap.min.css",
//    "cerulean" : "//bootswatch.com/cerulean/bootstrap.min.css",
//    "cosmo" : "//bootswatch.com/cosmo/bootstrap.min.css",
//    "cyborg" : "//bootswatch.com/cyborg/bootstrap.min.css",
//    "flatly" : "//bootswatch.com/flatly/bootstrap.min.css",
//    "journal" : "//bootswatch.com/journal/bootstrap.min.css",
//    "readable" : "//bootswatch.com/readable/bootstrap.min.css",
//    "simplex" : "//bootswatch.com/simplex/bootstrap.min.css",
//    "slate" : "//bootswatch.com/slate/bootstrap.min.css",
//    "spacelab" : "//bootswatch.com/spacelab/bootstrap.min.css",
//    "united" : "//bootswatch.com/united/bootstrap.min.css"
//};
//themesheet = $('<link href="'+themes['default']+'" rel="stylesheet" />');
//themesheet.appendTo('head');
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

