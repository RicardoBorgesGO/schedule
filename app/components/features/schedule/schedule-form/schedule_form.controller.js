/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .controller('ScheduleFormController', ScheduleFormController);

function ScheduleFormController($scope, ScheduleService, AuthService) {
    var ctrl = this;
    ctrl.hours = [];
    var hours = [];

    ctrl.$onInit = function () {
        ctrl.schedule = {};
        ctrl.data = new Date(ctrl.scheduleData.dataInicial);

        // console.log(ctrl.schedulesEvents);
        hoursAdded();

        loadHours();
    };

    function hoursAdded() {
        angular.forEach(ctrl.schedulesEvents, function (schedule) {
            hours.push(schedule.hour);
            // console.log(schedule);
        });
    }

    ctrl.onSelect = function () {
        loadHours();
    };

    function loadHours() {
        ctrl.hours = [];
        angular.forEach(ctrl.scheduleData.times, function (data) {
            if (ctrl.data.getDate() == data.dia) {
                var dateThis = new moment(data.timeInicial);
                var dateFinalThis = new moment(data.timeFinal);
                while (!dateThis.isAfter(dateFinalThis)) {
                    var dateStr = dateThis.get('hour') + ':' + (dateThis.get('minute') < 10 ? '0' + dateThis.get('minute'):dateThis.get('minute'));

                    var result = _.some(hours, function (hour) {
                        return hour === dateStr;
                    });

                    // hours.forEach(function (data) {
                    console.log(result, dateStr);
                    // });
                    ctrl.hours.push({hour: dateStr, active: !result});

                    dateThis = moment(dateThis).add(ctrl.scheduleData.intervalo, 'm');
                }

            }
        });
    }

    ctrl.onSelecthour = function (hour) {
        ctrl.schedule.hour = hour;
    };

    ctrl.save = function () {
        AuthService.getUserData().then(function (res) {
            ctrl.schedule.data = ctrl.data.getTime();
            ctrl.schedule.event = ctrl.scheduleData.$id;
            ctrl.schedule.user = Object.keys(res)[0];

            ScheduleService.add(ctrl.schedule);
        });
    };

    ctrl.dateValid = function ($date) {
        return $date.getTime() >= ctrl.scheduleData.dataInicial && $date.getTime() <= ctrl.scheduleData.dataFinal;
    };
}