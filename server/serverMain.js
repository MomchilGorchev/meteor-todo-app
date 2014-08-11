/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * Server side collections and methods
 */


Messages = new Meteor.Collection("messages");

Meteor.startup(function () {
    //process.env.MAIL_URL =  'smtp://';

    Meteor.publish("messages", function(userId){
        return Messages.find({author: this.userId});
    });

    Meteor.publish('userData', function(){
       return Meteor.users.find({_id: this.userId}).fetch();
    });

    /**
     * Main methods block
     */
    return Meteor.methods({

        addToLogs: function(logEntry){
          Logs.insert({
              date: logEntry.date,
              name: logEntry.name
          });
        },

        // Create new item
        createItem: function(newItem){
            if(newItem){
                Messages.insert({
                    title: newItem.title,
                    msg: newItem.msg,
                    createdAt: newItem.createdAt,
                    author: Meteor.user()._id,
                    dueDate: newItem.dueDate,
                    time: newItem.time,
                    status: 'not-done',
                    emailToNotify: newItem.emailToNotify,
                    notificationSent: 0,
                    orderBy: newItem.orderBy
                });
            }
        },


        // Remove item, remove all if Item's id is omitted
        removeItem: function(id){
            if(id == null){
                return Messages.remove({});
            } else {
                Messages.remove(id);
            }
        },

        // Updating any property
        updateCollectionItem: function(data){

            switch(data.token) {
                case 'dueDate':
                    Messages.update(data.itemId, {$set: {dueDate: data.newValue}});
                    break;
                case 'time':
                    Messages.update(data.itemId, {$set: {time: data.newValue}});
                    break;
                case 'title':
                    Messages.update(data.itemId, {$set: {title: data.newValue}});
                    break;
                case 'complete':
                    Messages.update(data.itemId, { $set: {status: 'completed'}});
                    break;
                case 'undo':
                    Messages.update(data.itemId, { $set: {status: 'not-done'}});
                    break;
                case 'edit':
                    Messages.update(data.itemId, { $set: {msg: data.newValue}});
                    break;
                default:
                    console.log('Default case for updateCollectionItem method');
            }
        },

        // Saves the theme when user picks one
        updateUser: function(data){
            Meteor.users.update({_id: data.user}, {$set: {profile: {theme: data.theme}}});
        }
    });
});
