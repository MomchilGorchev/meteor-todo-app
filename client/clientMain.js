/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Client side collections and stuff
 */
Messages = new Meteor.Collection("messages");
Meteor.subscribe('messages');

Template.app.messages = function() {
    return Messages.find();
};

Template.app.rendered = function(){
  $('.datepicker').datepicker({
      dateFormat: 'dd-mm-yy',
      altField: '#due-date',
      inline: true,
      showOtherMonths: true,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  });
};

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).calendar();
});