function compareDates(){
    // Save the time to measure the execution period
    console.time('Speed test');
    // Fetch all uncompleted items
    var allMessages = Messages.find({status: 'not-done'}).fetch();
    // Create the email counter for later use
    var emailsSent = 0;
    // Get the current time just once, we are matching the day only
    var now = {
        yy: +moment().format('YYYY'),
        mm: +moment().format('MM'),
        dd: +moment().format('DD'),
        hours: +moment().format('HH'),
        mins: +moment().format('mm')
    };
    // Iterate over the items array
    for(var i = 0; i < allMessages.length; i++){
        // Save the current item
        var _this = allMessages[i];
        // Save the current item's due date
        var dl = {
            dd: parseInt(_this.dueDate.slice(0, 2)),
            mm: parseInt(_this.dueDate.slice(3, 5)),
            yy: parseInt(_this.dueDate.slice(6, 10))
        };
        //console.log(_this);
        //console.log("------------------------");
        if(dl.yy == now.yy){
            if(dl.mm == now.mm){
                if(dl.dd == now.dd){
                    // Send email - today is the day!
                    // Only if not sent already
                    if(_this.notificationSent == 0){
                        Email.send({
                            from: "Meteor Todo App",
                            to: _this.emailToNotify,
                            subject: "Hi! Todo's Due date",
                            text: "Here is your todo's details\n"+
                                "Created: " + _this.createdAt + "\n"+
                                "Title: " + _this.title + "\n\n"+
                                "Message: " + _this.msg + "\n\n"+
                                "Thank you for using this app!"
                        });
                        // Update the value so not send again
                        Messages.update(_this._id, {$set: {notificationSent: 1}});
                        emailsSent++;
                    }
                } else if(dl.dd < now.dd){
                    // Outdated item
                    Messages.update(_this._id, {$set: {status: 'completed'}});
                }
            }else if(dl.mm < now.mm){
                // Outdated item
                Messages.update(_this._id, {$set: {status: 'completed'}});
            }
        }else if(dl.yy < now.yy){
            // Outdated item
            Messages.update(_this._id, {$set: {status: 'completed'}});
        }
    }
    // Stop the watch and print statistics
    console.log('--==> All Messages: ' + allMessages.length);
    console.log('--==> Emails sent: ' + emailsSent);
    console.timeEnd('Speed test');
    console.log('* * * Timestamp: ' + new Date() + ' * * *');
    return emailsSent;
}
Meteor.startup(function () {
    compareDates();
    process.env.MAIL_URL = 'smtp://fatninja1985:Karame11che@gmail.com:587';

});