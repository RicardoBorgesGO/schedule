/**
 * Created by ricardo on 13/04/17.
 */
angular
    .module('schedule.common')
    .service('ToastService', ToastService);

function ToastService($mdToast) {
    this.simple = function(str) {
        $mdToast.show(
            $mdToast.simple()
                .content(str)
                .position('top right')
                .hideDelay(3000)
        );
    };

    this.success = function(type, message) {
        var messages = {
            'added': 'Adicionado',
            'updated': 'Atualizado',
            'removed': 'Removido',
            'custom' : 'Customizado'
        };

        if (type != 'custom') {
            $mdToast.show({
                position  : 'top right',
                hideDelay : 3000,
                template : '<md-toast style="z-index: 100000;" class="toast--'+ type + '">' +
                '<span class="md-toast-text" flex>' + messages[type] + ' com sucesso</span>' +
                '</md-toast>'
            });
        } else {
            $mdToast.show({
                position  : 'top right',
                hideDelay : 3000,
                template : '<md-toast style="z-index: 100000;" class="toast--'+ type + '">' +
                '<span class="md-toast-text" flex>' + message + '</span>' +
                '</md-toast>'
            });
        }

    };
}