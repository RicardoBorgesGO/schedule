/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.auth')
    .controller('LoginController', LoginController);

function LoginController(AuthService, $state, ToastService) {
    var ctrl = this;
    ctrl.error = false;

    ctrl.login = function() {
        AuthService.login(ctrl.email, ctrl.password)
            .then(function(user) {
                ctrl.error = false;
                AuthService.isAdmin().then(function (admin) {
                    if (admin) {
                        $state.go('features');
                    } else {
                        $state.go('schedule.list');
                    }
                });
            }).catch(function(error) {
                ToastService.success('custom', 'Usuário ou senha inválido.');
                console.error("Authentication failed:", error);
                ctrl.error = true;
            });
    };
}