/**
 * Created by ricardo on 11/10/17.
 */
angular
    .module('schedule.events')
    .controller('EventListController', EventListController);

function EventListController($state, $mdToast, DialogService, EventService, ToastService) {
    var ctrl = this;

    ctrl.remove = function (event) {
        DialogService.confirmRemove()
            .then(function() {
                EventService.remove(event).then(function (response) {
                    ToastService.success('removed');
                });
            });
    };

    ctrl.go = function (id) {
        $state.go('event.edit', {id: id});
    };
}