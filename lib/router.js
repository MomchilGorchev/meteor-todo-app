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
        //controller: 'BasicController',
        path: '/'
    });

    this.route('notLogged', {
        //controller: 'LoginController',
        path: '/login'
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
//            Deps.autorun(function() {
//                parent = Meteor.user();
//                if (parent) return;
//                Router.go('/login');
//            });
//            return;
//        }
//    }
//});
//
//LoginController = RouteController.extend({
//    layoutTemplate: 'notLogged',
//    waitOn: function () {
//        if (Meteor.user()) {
//            Deps.autorun(function() {
//                parent = Meteor.user();
//                if (!parent) return;
//                Router.go('/');
//            });
//            return;
//        }
//    }
//});