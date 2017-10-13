/**
 * Created by ricardo on 11/10/17.
 */
/**
 * Created by ricardo on 11/04/17.
 */
angular
    .module('schedule.events')
    .controller('EventFormController', EventFormController);

function EventFormController($mdDialog, $scope, EventService) {
    var ctrl = this;
    var interval = 0;

    ctrl.$onInit = function () {
        if (!ctrl.event) {
            ctrl.event = {};
            if (!ctrl.event.usuarios){
                ctrl.event.usuarios = [];
            }
        }

        ctrl.intervalDate = 0;

        // ctrl.timeInicial = {};
        // ctrl.timeFinal = {};
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
        var a = moment(ctrl.dataFinal);
        var b = moment(ctrl.dataInicial);
        interval = a.diff(b, 'days');

        if (interval > 0)
            interval = interval+1;

        ctrl.intervalDate = interval;
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

        EventService.add(angular.copy(ctrl.event));
    };

    ctrl.showAddUsuarioDialog = function(usuario) {
        $mdDialog.show({
            controller: DialogAddUsuarioController,
            templateUrl: 'app/components/features/event/event-form/dialog.add.usuario.html',
            locals: {usuario: usuario},
            parent: angular.element(document.body),
            clickOutsideToClose: true
        });
    };



    //TODO fazer função para verificar se o login é igual a outro ja existente


    function DialogAddUsuarioController($scope, $mdDialog, usuario) {
        if (!usuario) {
            $scope.usuario = {};
            $scope.usuario.login = Math.floor((Math.random() * 10000000) + 1);
            $scope.usuario.password = makePassword();
            $scope.usuario.id = ctrl.event.usuarios.length + 1;
        }

        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.add = function () {
            ctrl.event.usuarios.push($scope.usuario);

            delete $scope.servico;
            $scope.hide();
        };
    };
}