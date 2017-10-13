/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .controller('ScheduleFormController', ScheduleFormController);

function ScheduleFormController($scope) {
    var ctrl = this;
    ctrl.hours = [];

    ctrl.$onInit = function () {
        // console.log(ctrl.scheduleData);
        // ctrl.dataInicial = new Date(ctrl.scheduleData.dataInicial);
        // ctrl.dataFinal = new Date(ctrl.scheduleData.dataFinal);
    };

    // $scope.$watch('[$ctrl.dataUsuario.data]', function() {
    //     angular.forEach(ctrl.scheduleData.times, function (data) {
    //         if (ctrl.dataUsuario.data == data.dia) {
    //             console.log(data.dia);
    //         }
    //     });
    // });

    ctrl.onSelect = function () {
        angular.forEach(ctrl.scheduleData.times, function (data) {
            if (ctrl.dataUsuario.data.getDate() == data.dia) {
                var dateThis = new moment(data.timeInicial);
                var dateFinalThis = new moment(data.timeFinal);
                while (!dateThis.isAfter(dateFinalThis)) {
                    var dateStr = dateThis.get('hour') + ':' + dateThis.get('minute');
                    ctrl.hours.push(dateStr);

                    dateThis = moment(dateThis).add(ctrl.scheduleData.intervalo, 'm');
                }

            }
        });
    };

    ctrl.dateValid = function ($date) {
        return $date.getTime() >= ctrl.scheduleData.dataInicial && $date.getTime() <= ctrl.scheduleData.dataFinal;
    };
}