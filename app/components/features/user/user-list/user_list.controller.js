/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.user')
    .controller('UserListController', UserListController);

function UserListController($state, DialogService, UserService, ToastService, AuthService) {
    var ctrl = this;

    ctrl.$onInit = function () {
        // console.log(AuthService.getUserData());
    };

    ctrl.remove = function (user) {
        DialogService.confirmRemove()
            .then(function() {
                AuthService.removeUser(user);
                ToastService.success('removed');
            });
    };

    ctrl.go = function (id) {
        $state.go('user.edit', {id: id});
    };
}