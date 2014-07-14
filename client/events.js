/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Template events
 */
Template.headerTemplate.events({
   'click .theme-link': function(){
       var themeurl = themes[$(this).attr('data-theme')];
       themesheet.attr('href',themeurl);
   }
});

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
            var newTodo = {
                title: title.value,
                msg: msg.value,
                createdAt: timeStamp,
                author: Meteor.user()._id,
                dueDate: dueDate.value,
                time: time.value,
                status: 'not-done',
                emailToNotify: Meteor.user().emails[0].address
            };
            Meteor.call('createItem', newTodo, function(err, response){
                if(err){
                    console.log('error returned');
                }
            });
            // Clear the field
            $(msg).val('').closest('div').removeClass('has-error');
            $(title).val('');
        }
    },

    // Clear the whole collection
    'click #clear': function(){
        confirm('Are you sure you want to clear all messages ?');
        Meteor.call('removeItem');
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
        event.preventDefault();
        var currentItem = this._id;
        var actionIcon = event.currentTarget.firstChild;
        var clicked =  $(event.currentTarget);
        var action = actionIcon.className;
        var dataToPass = {
            itemId: currentItem
        };
        if($(actionIcon).is('.fa-check')){
            //complete
            dataToPass.token = 'complete';
            Meteor.call('updateCollectionItem', dataToPass, function(err, response){
               if(err){
                   console.log('error returned');
               } else {
                   clicked.closest('.todo-item').toggleClass('todo-completed');
               }
            });
        }
        else if($(actionIcon).is('.fa-edit')){
            //edit
            var thisElementBody = template.find('.panel-body');
            $(thisElementBody).attr('contenteditable', true).focus();
            $(thisElementBody).blur(function(){
                $(this).attr('contenteditable', false);
                dataToPass.token = 'edit';
                dataToPass.newValue = $(this).find('p').html();
                console.log(dataToPass);
                Meteor.call('updateCollectionItem', dataToPass, function(err, response){
                    if(err){
                        console.log('error returned');
                    }
                });
            });
        }
        else if($(actionIcon).is('.fa-trash-o')){
            //remove
            console.log(dataToPass);
            Meteor.call('removeItem', currentItem, function(err, response){
                if(err){
                    console.log('err returned');
                }
            });
        }
    },

    //generic edit handler
    'click .info-editable': function(event, template){
        var collectionItem = this._id;
        var clicked = event.currentTarget;
        var dataToken = $(clicked).data('token');

        $(clicked).attr('contenteditable', true).focus();
        $(clicked).blur(function(){
            $(this).attr('contenteditable', false);
            var dataToPass = {
                itemId: collectionItem,
                token: dataToken,
                newValue: $(clicked).html()
            };
            Meteor.call('updateCollectionItem', dataToPass, function(err, response){
                if(err){
                    console.log('error returned');
                }
            });
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
        event.preventDefault();
        var currentItem = this._id;
        var actionIcon = event.currentTarget.firstChild;
        var clicked =  $(event.currentTarget);
        var action = actionIcon.className;
        var dataToPass = {
            itemId: currentItem
        };
        if($(actionIcon).is('.fa-undo')){
            //complete
            dataToPass.token = 'undo';
            Meteor.call('updateCollectionItem', dataToPass, function(err, response){
                if(err){
                    console.log('error returned');
                } else {
                    clicked.closest('.todo-item').toggleClass('todo-completed');
                }
            });
        }
        else if($(actionIcon).is('.fa-edit')){
            //edit
            var thisElementBody = template.find('.panel-body');
            $(thisElementBody).attr('contenteditable', true).focus();
            $(thisElementBody).blur(function(){
                $(this).attr('contenteditable', false);
                dataToPass.token = 'edit';
                dataToPass.newValue = $(this).find('p').html();
                console.log(dataToPass);
                Meteor.call('updateCollectionItem', dataToPass, function(err, response){
                    if(err){
                        console.log('error returned');
                    }
                });
            });
        }
        else if($(actionIcon).is('.fa-trash-o')){
            //remove
            console.log(dataToPass);
            Meteor.call('removeItem', currentItem, function(err, response){
                if(err){
                    console.log('err returned');
                }
            });
        }
    },

    //generic edit handler
    'click .info-editable': function(event, template){
        var collectionItem = this._id;
        var clicked = event.currentTarget;
        var dataToken = $(clicked).data('token');

        $(clicked).attr('contenteditable', true).focus();
        $(clicked).blur(function(){
            $(this).attr('contenteditable', false);
            var dataToPass = {
                itemId: collectionItem,
                token: dataToken,
                newValue: $(clicked).html()
            };
            Meteor.call('updateCollectionItem', dataToPass, function(err, response){
                if(err){
                    console.log('error returned');
                }
            });
        });
    }
});

Template.settings.events({
    'click .theme-toggle': function(event, template){
        var token = $(event.currentTarget).data('theme');
        // Left to be done: Mechanism for persisting the theme
        if(token == 'default'){
            $('#themeApplied').detach();
        }else{
            themesheet = $('<link id="themeApplied" href="'+themes[token]+'" rel="stylesheet" />');
            themesheet.appendTo('head');
        }
    }
});