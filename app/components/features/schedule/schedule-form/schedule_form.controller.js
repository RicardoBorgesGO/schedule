/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .controller('ScheduleFormController', ScheduleFormController);

function ScheduleFormController($scope, ScheduleService) {
    var ctrl = this;
    ctrl.hours = [];

    ctrl.$onInit = function () {
        ctrl.schedule = {};
    };

    ctrl.onSelect = function () {
        angular.forEach(ctrl.scheduleData.times, function (data) {
            if (ctrl.data.getDate() == data.dia) {
                var dateThis = new moment(data.timeInicial);
                var dateFinalThis = new moment(data.timeFinal);
                while (!dateThis.isAfter(dateFinalThis)) {
                    var dateStr = dateThis.get('hour') + ':' + (dateThis.get('minute') < 10 ? '0' + dateThis.get('minute'):dateThis.get('minute'));
                    ctrl.hours.push(dateStr);

                    dateThis = moment(dateThis).add(ctrl.scheduleData.intervalo, 'm');
                }

            }
        });
    };

    ctrl.onSelecthour = function (hour) {
        ctrl.schedule.hour = hour;
    };

    ctrl.save = function () {
        ctrl.schedule.data = ctrl.data.getTime();

        ScheduleService.add(ctrl.schedule);
    };

    ctrl.dateValid = function ($date) {
        return $date.getTime() >= ctrl.scheduleData.dataInicial && $date.getTime() <= ctrl.scheduleData.dataFinal;
    };
}