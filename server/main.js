/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Server side collections and methods
 */

Messages = new Meteor.Collection("messages");

Messages.allow({
    'insert': function(){
        return true;
    },
    'update': function(){
        return true;
    },
    'remove': function(){
        return true;
    }
});

Meteor.publish("messages", function(){
    return Messages.find();
});

Meteor.startup(function () {
    return Meteor.methods({
        removeAll: function () {
            return Messages.remove({});
        }
    });
});