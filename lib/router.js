/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * App router
 */
Router.configure({
    layoutTemplate: 'app',
    loginTemplate: 'notLogged'
});

Router.map(function() {
    this.route('app', {
        controller: 'BasicController',
        path: '/'
    });

    this.route('notLogged', {
        controller: 'LoginController',
        path: '/login'
    });
});


/**
 *
 * Controllers
 */
BasicController = RouteController.extend({
    layoutTemplate: 'app',
    loadingTemplate: 'notLogged',
    onBeforeAction: function () {
        if (!Meteor.user()) {
            this.redirect('/login');
            return;
        }
    }
});

LoginController = BasicController.extend({
    layoutTemplate: 'notLogged',
    onAfterAction: function () {
        if (Meteor.user()) {
            this.redirect('/');
            return;
        }
    }
});