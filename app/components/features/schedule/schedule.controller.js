/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .controller('ScheduleListController', ScheduleListController);

function ScheduleListController($state) {
    var ctrl = this;

    ctrl.isResolved = function (eventId) {
        var result = _.some(ctrl.schedulesUser, function (su) {
            return su.event === eventId;
        });

        return result;
        // console.log(eventId, result);
    };

    ctrl.go = function(id) {
        $state.go('schedule.edit', {id: id});
    };
}