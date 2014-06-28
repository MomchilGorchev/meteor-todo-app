/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Template events
 */

Template.app.events({
    // Submit a message
    'click .submit': function(event, template){
        var titleField = template.find('#titleField');
        var textField = template.find('#textField');
        var title = titleField.value;
        var msg = textField.value;

        if(msg.length < 1 || $.trim(msg).length == 0){
            console.log('Empty str');
            $(textField).closest('div').addClass('has-error');
        } else if(title.length < 1 || $.trim(title).length == 0) {
            title = 'New ToDo';
        } else {
            var timeStamp = new Date();
            console.log(Meteor.user());
            var result = Messages.insert({title: title, msg: msg, createdAt: timeStamp, author: Meteor.user()._id});
            $(textField).val('').closest('div').removeClass('has-error');
            $(titleField).val('');
        }
    },

    // Add the message on Enter press
    'keypress #textField': function(event, template){
        if(event.which === 13){
            var titleField = template.find('#titleField');
            var textField = template.find('#textField');
            var title = titleField.value;
            var msg = textField.value;

            if(msg.length < 1 || $.trim(msg).length == 0){
                console.log('Empty str');
                $(textField).closest('div').addClass('has-error');
            } else if(title.length < 1 || $.trim(title).length == 0) {
                title = 'New ToDo';
            } else {
                var timeStamp = new Date();
                var result = Messages.insert({title: title, msg: msg, createdAt: timeStamp, author: Meteor.user()._id, status: 'not-done'});
                $(textField).val('').closest('div').removeClass('has-error');
                $(titleField).val('');
            }
        }
    },

    // Clear the whole collection
    'click #clear': function(){
        confirm('Are you sure you want to clear all messages ?');
        Meteor.call('removeAll');
    }
});

Template.todoItem.events({
    // Show/Hide action bar
    'mouseover .todo-item': function(event, template){
        var footer = template.find('.panel-footer');
        $(footer).show();
    },
    'mouseout .todo-item': function(event, template){
        var footer = template.find('.panel-footer')
        $(footer).hide();
    },

    // Actions handler
    'click .action-icon': function(event, template){
        var actionIcon = event.currentTarget.firstChild;
        if($(actionIcon).is('.fa-check')){
            //complete
            console.log(this);
            console.log('Updating...');
            Messages.update(this._id, { $set: {'status': 'completed'}});
            console.log(this);


        }
        else if($(actionIcon).is('.fa-edit')){
            //edit
            console.log('Edit!');
        }
        else if($(actionIcon).is('.fa-trash-o')){
            //remove
            console.log('Remove!');
        }
    }
});