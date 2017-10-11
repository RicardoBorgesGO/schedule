/**
 * Created by ricardo on 11/10/17.
 */
/**
 * Created by ricardo on 11/04/17.
 */
angular
    .module('schedule.events')
    .controller('EventFormController', EventFormController);

function EventFormController($mdDialog, EventService) {
    var ctrl = this;

    ctrl.$onInit = function () {
        if (!ctrl.event) {
            ctrl.event = {};
            if (!ctrl.event.usuarios){
                ctrl.event.usuarios = [];
            }
        }
    };

    ctrl.selectedRange = {
        selectedTemplate: 'TW',
        selectedTemplateName: 'This Week',
        dateStart: new Date(),
        dateEnd: new Date(),
        showTemplate: false,
        fullscreen: false
    };

    ctrl.save = function () {
        ctrl.event.dataInicial = ctrl.dataInicial.getTime();
        ctrl.event.dataFinal = ctrl.dataFinal.getTime();

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

    function DialogAddUsuarioController($scope, $mdDialog, usuario) {
        if (!usuario) {
            $scope.usuario = {};
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