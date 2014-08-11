/**
 * Created by momchillgorchev on 02/08/2014.
 */
Logs = new Meteor.Collection('logs');
Pages = new Meteor.Pagination(Logs, {
    perPage: 5
});