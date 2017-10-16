/**
 * Created by ricardo on 11/10/17.
 */
/**
 * Created by ricardo on 11/04/17.
 */
angular
    .module('schedule.events')
    .controller('EventFormController', EventFormController);

function EventFormController($scope, $state, EventService, ToastService) {
    var ctrl = this;
    var interval = 0;

    ctrl.$onInit = function () {
        ctrl.isNew = (ctrl.event === undefined);

        if (!ctrl.event) {
            ctrl.event = {};
            if (!ctrl.event.usuarios){
                ctrl.event.usuarios = [];
            }
        } else {
            ctrl.dataInicial = new Date(ctrl.event.dataInicial);
            ctrl.dataFinal = new Date(ctrl.event.dataFinal);
        }

        ctrl.intervalDate = {};
        // ctrl.intervalDate.intervalo = 0;
    };

    ctrl.selectedRange = {
        selectedTemplate: 'TW',
        selectedTemplateName: 'This Week',
        dateStart: new Date(),
        dateEnd: new Date(),
        showTemplate: false,
        fullscreen: false
    };

    $scope.$watch('[$ctrl.dataFinal, $ctrl.dataInicial]', function() {
        if (ctrl.dataInicial) {
            var a = moment(ctrl.dataFinal);
            var b = moment(ctrl.dataInicial);
            interval = a.diff(b, 'days');

            if (interval > 0)
                interval = interval+1;

            var dia = ctrl.dataInicial.getDate();
            var days = [];
            for (var i = 0; i < interval; i++) {
                days.push(dia + i);
            }

            //ctrl.intervalDate.intervalo = interval;
            ctrl.intervalDate.days = days;
        }
    });

    ctrl.getNumber = function(num) {
        return new Array(num);
    }

    ctrl.save = function () {
        ctrl.event.dataInicial = ctrl.dataInicial.getTime();
        ctrl.event.dataFinal = ctrl.dataFinal.getTime();
        ctrl.event.times = [];
        var dia = ctrl.dataInicial.getDate();

        for (var i = 0; i < interval; i++) {
            var time = {
                timeInicial: ctrl.timeInicial['data' + i].getTime(),
                timeFinal: ctrl.timeFinal['data' + i].getTime(),
                dia: dia+i
            }
            ctrl.event.times.push(time);
        }


        if (ctrl.isNew) {
            EventService.add(angular.copy(ctrl.event));
            ToastService.success('added');
        } else {
            console.log(ctrl.event);
            EventService.save(ctrl.event);
            ToastService.success('updated');
        }

        ctrl.back();
    };

    ctrl.back = function () {
        $state.go('event.list');
    };
}