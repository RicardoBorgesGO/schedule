/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.user')
    .controller('UserFormController', UserFormController);

function UserFormController($state, UserService) {
    var ctrl = this;

    function makePassword() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function makeLogin() {
        return Math.floor((Math.random() * 10000000) + 1);
    }

    ctrl.save = function () {
        ctrl.user.login = makeLogin();
        ctrl.user.password = makePassword();

        UserService.add(ctrl.user);
    };
}