/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * App router
 */
Router.configure({
    layoutTemplate: 'mainLayout'
});

Router.map(function() {
    this.route('app', {
        path: '/',
        onBeforeAction: function(){
            if(!Meteor.user()){
                console.log('Not a user');
                this.redirect('notLogged');
            }
        }
    });

    this.route('notLogged', {
        path: '/login',
        onBeforeAction: function(){
            if(Meteor.user()){
                console.log('It is a user');
                this.redirect('app');

            }
        }
    });
});


/**
 *
 * Controllers
 */
//BasicController = RouteController.extend({
//    layoutTemplate: 'app',
//    waitOn: function () {
//        if (!Meteor.user()) {
////            this.redirect('/login');
//            return;
//        }
//    }
//});
//
//LoginController = RouteController.extend({
//    layoutTemplate: 'notLogged',
//    waitOn: function () {
//        if (Meteor.user()) {
//            return;
//        }
//    }
//});