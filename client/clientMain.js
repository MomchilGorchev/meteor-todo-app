/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Client side collections and stuff
 */

// Get the data
Messages = new Meteor.Collection("messages");
Meteor.subscribe('messages');
Meteor.subscribe('users');

// Preserving theme selection on login
Template.headerTemplate.rendered = function(){
    if(Meteor.user()){
        var preferredTheme = Meteor.user().profile.theme;
        if(preferredTheme != 'default'){
            var themesheet = $('<link id="themeApplied" href="'+ themes[preferredTheme] +'" rel="stylesheet" />');
        }
        if(!$('#themeApplied').length){
            themesheet.appendTo('head');
        }
    }
};

// Return only not-completed todo-s
Template.todoLists.messages = function() {
   return Messages.find({status: 'not-done'}, {sort: {createdAt: -1}});
};

// Return only completed todo-s
Template.todoLists.messagesCompleted = function() {
    return Messages.find({status: 'completed'}, {sort: {createdAt: -1}});
};

// New item rendered function
Template.addNewItem.rendered = function(){
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

Template.settings.rendered = function(){
    var chart = c3.generate({
        bindto: '#chart',
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 50, 20, 10, 40, 15, 25]
            ]
        }
    });
};

// Prettify Date
Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).calendar();
});
