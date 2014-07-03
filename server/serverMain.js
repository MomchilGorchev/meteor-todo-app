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

    return Meteor.methods({
        removeAll: function () {
            return Messages.remove({});
        },

        updateCollectionItem: function(data){
            if(data.token == 'dueDate'){
                Messages.update(data.itemId, {$set: {dueDate: data.newValue}});
            }
            else if(data.token == 'time'){
                Messages.update(data.itemId, {$set: {time: data.newValue}});
            }
            else if(data.token == 'title'){
                Messages.update(data.itemId, {$set: {title: data.newValue}});
            }
        }

//        sendEmail: function (to, from, subject, text) {
//            check([to, from, subject, text], [String]);
//
//            // Let other method calls from the same client start running,
//            // without waiting for the email sending to complete.
//            this.unblock();
//
//            Email.send({
//                to: to,
//                from: from,
//                subject: subject,
//                text: text
//            });
//        }
    });
});
