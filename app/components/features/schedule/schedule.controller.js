/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .controller('ScheduleListController', ScheduleListController);

function ScheduleListController($state) {
    var ctrl = this;

    ctrl.go = function(id) {
        $state.go('schedule.edit', {id: id});
    };
}