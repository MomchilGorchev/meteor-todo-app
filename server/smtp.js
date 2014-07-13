function compareDates(){
    var start = new Date().getTime();
    var allMessages = Messages.find({status: 'not-done'}).fetch();
    var emailsSent = 0;
    for(var i = 0; i < allMessages.length; i++){
        var dl = {
            dd: parseInt(allMessages[i].dueDate.slice(0, 2)),
            mm: parseInt(allMessages[i].dueDate.slice(3, 5)),
            yy: parseInt(allMessages[i].dueDate.slice(6, 10))
        };
        var now = {
            yy: parseInt(moment().format('YYYY')),
            mm: parseInt(moment().format('MM')),
            dd: parseInt(moment().format('DD')),
            hours: parseInt(moment().format('HH')),
            mins: parseInt(moment().format('mm'))
        };
        //console.log(allMessages[i]);
        //console.log("------------------------");
        if(dl.yy == now.yy){
            if(dl.mm == now.mm){
                if(dl.dd == now.dd){
                    // Send email - today is the day!
                    // Only if not sent already
                    if(allMessages[i].notificationSent == 0){
                        Email.send({
                            from: "Meteor Todo App",
                            to: allMessages[i].emailToNotify,
                            subject: "Hi! Todo's Due date",
                            text: "Here is your todo's details\n"+
                                "Created: " + allMessages[i].createdAt + "\n"+
                                "Title: " + allMessages[i].title + "\n\n"+
                                "Message: " +allMessages[i].msg + "\n\n"+
                                "Thank you for using this app!"
                        });
                        // Update the value so not send again
                        Messages.update(allMessages[i]._id, {$set: {notificationSent: 1}});
                        emailsSent++;
                    }
                } else if(dl.dd < now.dd){
                    // Outdated item
                    Messages.update(allMessages[i]._id, {$set: {status: 'completed'}});
                }
            }else if(dl.mm < now.mm){
                // Outdated item
                Messages.update(allMessages[i]._id, {$set: {status: 'completed'}});
            }
        }else if(dl.yy < now.yy){
            // Outdated item
            Messages.update(allMessages[i]._id, {$set: {status: 'completed'}});
        }
    }
    var end = new Date().getTime();
    var result = start - end;
    console.log('All Messages: ' + allMessages.length);
    console.log('Emails sent: ' + emailsSent);
    console.log('Exucution time: ' + result);
    console.log('Timestamp: ' + new Date());
    return emailsSent;
}
Meteor.startup(function () {
    compareDates();
    process.env.MAIL_URL = 'smtp://fatninja1985:Karame11che@gmail.com:587';
    if(Meteor.isServer){
        //compareDates();
    }
});