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

    //generic edit handler
    'click .info-editable': function(event, template){
        var collectionItem = this._id;
        var clicked = event.currentTarget;
        var dataToken = $(clicked).data('token');
        if(dataToken == 'dueDate'){
            $(clicked).attr('contenteditable', true).focus();
            $(clicked).blur(function(){
                $(this).attr('contenteditable', false);
                Messages.update(collectionItem, {$set: {dueDate: $(this).html()}})
            });
        }
        else if(dataToken == 'time'){
            $(clicked).attr('contenteditable', true).focus();
            $(clicked).blur(function(){
                $(this).attr('contenteditable', false);
                Messages.update(collectionItem, {$set: {time: $(this).html()}})
            });
        }
        else if(dataToken == 'title'){
            $(clicked).attr('contenteditable', true).focus();
            $(clicked).blur(function(){
                $(this).attr('contenteditable', false);
                Messages.update(collectionItem, {$set: {title: $(this).html()}})
            });
        }
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

    //generic edit handler
    'click .info-editable': function(event, template){
        var collectionItem = this._id;
        var clicked = event.currentTarget;
        var dataToken = $(clicked).data('token');
        if(dataToken == 'dueDate'){
            $(clicked).attr('contenteditable', true).focus();
            $(clicked).blur(function(){
                $(this).attr('contenteditable', false);
                Messages.update(collectionItem, {$set: {dueDate: $(this).html()}})
            });
        }
        else if(dataToken == 'time'){
            $(clicked).attr('contenteditable', true).focus();
            $(clicked).blur(function(){
                $(this).attr('contenteditable', false);
                Messages.update(collectionItem, {$set: {time: $(this).html()}})
            });
        }
        else if(dataToken == 'title'){
            $(clicked).attr('contenteditable', true).focus();
            $(clicked).blur(function(){
                $(this).attr('contenteditable', false);
                Messages.update(collectionItem, {$set: {title: $(this).html()}})
            });
        }
    }
});
