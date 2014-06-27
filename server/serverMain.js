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

Meteor.publish("messages", function(userId){
    console.log(Meteor.users.find({_id: this.userId}));
    return Messages.find({author: this.userId});
});

Meteor.startup(function () {
    return Meteor.methods({
        removeAll: function () {
            return Messages.remove({});
        }
    });
});


/*
users.each(users, function(user){
    var id;
    id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: {name: user.name}
    })
});

if(users.roles.length > 0){
    Roles.addUsersToRoles(id, user.roles);
}*/
