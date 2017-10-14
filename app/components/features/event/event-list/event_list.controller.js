/**
 * Created by ricardo on 11/10/17.
 */
angular
    .module('schedule.events')
    .controller('EventListController', EventListController);

function EventListController($state) {
    var ctrl = this;

    ctrl.go = function (id) {
        $state.go('event.edit', {id: id});
    };
}