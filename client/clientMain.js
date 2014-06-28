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

Handlebars.registerHelper("prettifyDate", function(timestamp) {
    return moment(new Date(timestamp)).calendar();
});