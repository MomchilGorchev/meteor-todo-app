/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Template events
 */

Template.app.events({
    // Submit a message
    'click .submit': function(event, template){
        // Get the info from the fields
        var title = template.find('#titleField');
        var msg = template.find('#textField');
        var dueDate = template.find('#due-date');
        var time = template.find('#daytime');
        // If there is no content in the description
        if(msg.value.length < 1 || $.trim(msg.value).length == 0){
            console.log('Empty str');
            $(msg).closest('div').addClass('has-error');
        } else {
            // Else if the title is empty, create it with "New ToDo" title
            if(title.value.length < 1 || $.trim(title.value).length == 0) {
                title.value = 'New ToDo';
            }
            // Save the new message to the collection
            var timeStamp = new Date();
            var result = Messages.insert({
                title: title.value,
                msg: msg.value,
                createdAt: timeStamp,
                author: Meteor.user()._id,
                dueDate: dueDate.value,
                time: time.value,
                status: 'not-done'
            });
            // Clear the field
            $(msg).val('').closest('div').removeClass('has-error');
            $(title).val('');
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
    'mouseover .panel': function(event, template){
        var footer = template.find('.panel-footer');
        $(footer).show();
    },
    'mouseout .panel': function(event, template){
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
                var newMsg = $(this).find('p').html();
                Messages.update(currentItem, { $set: {msg: newMsg}});
            });
        }
        else if($(actionIcon).is('.fa-trash-o')){
            //remove
            Messages.remove(currentItem);
        }
    },
    // Handle edit on the title
    'click .todo-title': function(event, template){
        var currentItem = this._id;
        console.log(event);
        $(event.currentTarget).attr('contenteditable', true).focus();
        $(event.currentTarget).blur(function(){
            $(this).attr('contenteditable', false);
            var newTitle = $(this).html();
            Messages.update(currentItem, { $set: {title: newTitle}});
        });
    },
    // Handle edit on the Date and time
    'click .actual-date': function(event, template){
        var currentItem = this._id;
        var clicked = $(event.currentTarget);
        $(clicked).attr('contenteditable', true).focus();
        console.log(clicked);
        $(clicked).blur(function(){
            console.log($(this));
            $(this).attr('contenteditable', false);
            var newDeadline = $(this).html();
            Messages.update(currentItem, { $set: {dueDate: newDeadline}});
        });
    }
});

Template.todoItemCompleted.events({
    // Show/Hide action bar
    'mouseover .panel': function(event, template){
        var footer = template.find('.panel-footer');
        $(footer).show();
    },
    'mouseout .panel': function(event, template){
        var footer = template.find('.panel-footer')
        $(footer).hide();
    },

    // Actions handler
    'click .action-icon': function(event, template){
        var currentItem = this._id;
        var actionIcon = event.currentTarget.firstChild;
        var clicked =  $(event.currentTarget);
        if($(actionIcon).is('.fa-undo')){
            //complete
            Messages.update(this._id, { $set: {'status': 'not-done'}});
            clicked.closest('.todo-item').toggleClass('todo-completed');
        }
        else if($(actionIcon).is('.fa-edit')){
            //edit
            var thisElementBody = template.find('.panel-body');
            $(thisElementBody).attr('contenteditable', true).focus();
            $(thisElementBody).blur(function(){
                $(this).attr('contenteditable', false);
                var newMsg = $(this).find('p').html();
                Messages.update(currentItem, { $set: {msg: newMsg}});
            });
        }
        else if($(actionIcon).is('.fa-trash-o')){
            //remove
            Messages.remove(currentItem);
        }
    },
    // Handle edit on the title
    'click .todo-title': function(event, template){
        var currentItem = this._id;
        console.log(event);
        $(event.currentTarget).attr('contenteditable', true).focus();
        $(event.currentTarget).blur(function(){
            $(this).attr('contenteditable', false);
            var newTitle = $(this).html();
            Messages.update(currentItem, { $set: {title: newTitle}});
        });
    },

    // Handle edit on the Date and time
    'click .actual-date': function(event, template){
        var currentItem = this._id;
        var clicked = $(event.currentTarget);
        $(clicked).attr('contenteditable', true).focus();
        console.log(clicked);
        $(clicked).blur(function(){
            console.log($(this));
            $(this).attr('contenteditable', false);
            var newDeadline = $(this).html();
            Messages.update(currentItem, { $set: {dueDate: newDeadline}});
        });
    }
});