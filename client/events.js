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
        var currentItem = this._id;
        var actionIcon = event.currentTarget.firstChild;
        var clicked =  $(event.currentTarget);
        if($(actionIcon).is('.fa-check')){
            //complete
            Messages.update(this._id, { $set: {'status': 'completed'}});
            clicked.closest('.todo-item').toggleClass('todo-completed');
        }
        else if($(actionIcon).is('.fa-edit')){
            //edit
            var thisElementBody = template.find('.panel-body');
            $(thisElementBody).attr('contenteditable', true).focus();
            $(thisElementBody).blur(function(){
                $(this).attr('contenteditable', false);
                var newMsg = $(this).html();
                Messages.update(currentItem, { $set: {msg: newMsg}});
            });
        }
        else if($(actionIcon).is('.fa-trash-o')){
            //remove
            Messages.remove(currentItem);
        }
    }
});