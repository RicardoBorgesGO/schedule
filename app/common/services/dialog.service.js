/**
 * Created by ricardo on 14/10/17.
 */
angular
    .module('schedule.common')
    .service('DialogService', DialogService);

function DialogService($mdDialog) {
    this.alert = function(obj) {
        var confirm = $mdDialog.confirm()
            .title(obj.title)
            .textContent(obj.text)
            .ariaLabel(obj.title)
            .ok(obj.ok)
            .cancel(obj.cancel);

        return $mdDialog.show(confirm);
    };

    this.confirmRemove = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('Deseja excluir este item ?')
            .textContent('Esta ação não poderá ser desfeita.')
            .ariaLabel('Excluir item')
            .targetEvent(ev)
            .ok('Excluir')
            .cancel('Cancelar');

        return $mdDialog.show(confirm);
    };
}