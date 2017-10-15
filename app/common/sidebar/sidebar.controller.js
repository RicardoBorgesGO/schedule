/**
 * Created by ricardo on 15/10/17.
 */
angular
    .module('schedule.common')
    .controller('SidebarController', SidebarController);

function SidebarController($state, $mdSidenav) {
    var ctrl = this;
    ctrl.domLoaded = false;

    ctrl.$postLink = function() {
        ctrl.domLoaded = true;
    };

    ctrl.$onChanges = function(changes) {
        if(changes.toggleSidebar && ctrl.domLoaded) {
            $mdSidenav('sidebar').toggle();
        }
    };

    ctrl.go = function(link) {
        $state.go(link);
    };

    ctrl.logout = function() {
        // AuthService.logout()
        //     .then(function() {
        //         $state.go('login');
        //     });
    };
}