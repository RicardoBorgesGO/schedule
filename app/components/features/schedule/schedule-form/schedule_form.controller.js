/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .controller('ScheduleFormController', ScheduleFormController);

function ScheduleFormController() {
    var ctrl = this;

    ctrl.$onInit = function () {
        // console.log(ctrl.scheduleData);
        // ctrl.dataInicial = new Date(ctrl.scheduleData.dataInicial);
        // ctrl.dataFinal = new Date(ctrl.scheduleData.dataFinal);
    };

    ctrl.dateValid = function ($date) {
        return $date.getTime() < ctrl.scheduleData.dataInicial || $date.getTime() > ctrl.scheduleData.dataFinal;
    };
}