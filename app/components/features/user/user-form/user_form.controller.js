/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.user')
    .controller('UserFormController', UserFormController);

function UserFormController($state, UserService, AuthService, ToastService) {
    var ctrl = this;

    ctrl.$onInit = function () {
        ctrl.isNew = (ctrl.userData === undefined);

        ctrl.events = _.map(ctrl.events, function(event) {
            event.selected = false;

            if(!ctrl.isNew) {
                event.selected = _.find(ctrl.userData.events, function(eventFeatures) {
                    return eventFeatures === event.$id;
                }) ? true : false;
            }

            return event;
        });
    };

    function makePassword() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 8; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    function makeLogin() {
        return Math.floor((Math.random() * 10000000) + 1);
    }

    ctrl.save = function () {
        ctrl.userData.events = _.chain(ctrl.events)
            .filter(function(event){
                return event.selected;
            })
            .map(function(event){
                return event.$id;
            })
            .value();

        if (ctrl.isNew) {
            ctrl.userData.isAdmin = false;

            var password = makePassword();
            ctrl.userData.password = password;
            AuthService.createUser(ctrl.userData);
        } else {
            UserService.save(ctrl.userData);
        }

        ToastService.success('added');
        ctrl.back();
    };

    ctrl.back = function () {
        $state.go('user.list');
    };
}