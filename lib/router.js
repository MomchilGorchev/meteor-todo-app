/**
 * Created by momchillgorchev on 12/05/2014.
 *
 * App router
 */
Router.configure({
    layoutTemplate: 'app'
});

Router.map(function() {
    this.route('app', { path: '/', template: 'app'});
    //this.route('loginForm', { path: '/login', template: 'loginForm'});
});