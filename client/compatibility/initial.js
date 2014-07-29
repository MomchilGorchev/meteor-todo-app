/**
 * Created by momchillgorchev on 22/07/2014.
 *
 * Function Declarations
 */

/**
 * Notification handling
 *
 * @param spinner - loading image
 * @param newone - new loader to add after we modify old one
 * @param result - request response
 */
function notify(spinner, newone, result){
    if(result){
        console.log('success returned');
        spinner.addClass('success').animate({
            'background-color': '#d3f1d1',
            'width': '300px',
            'height': '50px',
            'left': '37%',
            'top': '1%'
        }, 400, function(){
            var text = $('<p class="response-text success">Success!</p>');
            text.appendTo(spinner).fadeIn();
            setTimeout(function(){
                spinner.fadeOut(400, function(){
                    this.remove();
                });
                $('.navbar-inner').prepend(newone);
            }, 2000);
        });
    } else {
        console.log('fail returned');
        spinner.addClass('failed').animate({
            'background-color': '#F3C0C0',
            'width': '300px',
            'height': '50px',
            'left': '37%',
            'top': '1%'
        }, 400, function(){
            var text = $('<p class="response-text failed">Error!</p>');
            text.appendTo(spinner).fadeIn();
            setTimeout(function(){
                spinner.fadeOut(400, function(){
                    this.remove();
                });
                $('.navbar-inner').prepend(newone);
            }, 2000);
        });
    }
}

/**
 * Charts - Done vs. Not done
 */
function drawChart(){
    var notDone = Messages.find({status: 'not-done'}, {sort: {createdAt: -1}}).count();
    var completed = Messages.find({status: 'completed'}, {sort: {createdAt: -1}}).count();
    // Basic chart, read the docs to enhance it
    if(notDone != 0 || completed != 0){
        var chart = c3.generate({
            bindto: '#chart',
            size: {
                width: 300,
                height: 280
            },
            data: {
                // iris data from R
                columns: [
                    ['Completed', completed],
                    ['Not completed', notDone]
                ],
                type : 'pie'
            }
        });
    } else {
        $('#chart').html('<p class="empty-coll">You do not have anything To-Do!<br /> Get yourself a drink! :)</p>');
    }
    var stats = $('.stats');
    stats.find('.completed').html(completed);
    stats.find('.not').html(notDone);
    stats.find('.total').html(notDone + completed);
}
