/**
 * Created by momchillgorchev on 22/07/2014.
 *
 * First JS code to execute
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
