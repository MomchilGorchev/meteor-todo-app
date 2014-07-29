/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Client side collections and stuff
 */

Messages = new Meteor.Collection("messages");
Meteor.subscribe('messages');
Meteor.subscribe('users');


Template.headerTemplate.rendered = function(){
    if(Meteor.user()) {
        var preferredTheme = Meteor.user().profile.theme;
        var themesheet = $('<link id="themeApplied" href="' + themes[preferredTheme] + '" rel="stylesheet" />');
        if(preferredTheme != 'default'){
            if(!$('#themeApplied').length){
                themesheet.appendTo('head');
            }
        }
    }
};

// Return only not-completed todo-s
Template.todoLists.messages = function() {
   return Messages.find({status: 'not-done'}, {sort: {orderBy: 1}});
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

Template.settings.rendered = function(template){
    Deps.autorun(function (c) {
        drawChart();
    });
};
// Prettify Date
Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).calendar();
});
