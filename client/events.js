/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Template events
 */

Template.app.events({
    // Submit a message
    'click .submit': function(event, template){
        var field = template.find('#textField');
        var msg = field.value;
        if(msg.length < 1 || $.trim(msg).length == 0){
            console.log('Empty str');
            $(field).closest('div').addClass('has-error');
        } else {
            Messages.insert({name: msg});
            $(field).val('').closest('div').removeClass('has-error');
        }
    },

    // Add the message on Enter press
    'keypress #textField': function(ev, template){
        if(ev.which === 13){
            var field = template.find('#textField');
            var msg = field.value;
            if(msg.length < 1 || $.trim(msg).length == 0){
                console.log('Empty str');
                $(field).closest('div').addClass('has-error');
            } else {
                Messages.insert({name: msg});
                $(field).val('').closest('div').removeClass('has-error');
            }
        }
    },

    // Clear the whole collection
    'click #clear': function(){
        confirm('Are you sure you want to clear all messages ?');
        Meteor.call('removeAll');
    }
});
