/**
 * Created by ricardo on 04/04/17.
 */
angular
    .module('schedule.features')
    .controller('FeaturesController', FeaturesController);

function FeaturesController(FeaturesService, AuthService, $scope, $rootScope, $state, $stateParams) {
    var ctrl = this;

    ctrl.$onInit = function () {
        $scope.features = ctrl.features;
        $scope.isAdmin = ctrl.isAdmin;
    };

    $scope.logout = function () {
        AuthService.logout();
    };

    $scope.back = function () {
        $state.go('login');
    };

    // ctrl.$onInit = function() {
    //     if($state.$current.name === 'features') {
    //         ctrl.features[0].expand = true;
    //         $state.go(ctrl.features[0].subservices[0].link);
    //     } else {
    //         var state = $state.$current.name.split('.');
    //         var theme;
    //
    //         theme = state[0] === 'dashboard' ?
    //             'default'
    //             : state[0] + 'Theme';
    //
    //         loadTheme(null, {theme: theme});
    //     }
    // };
    // ctrl.$onDestroy = function() {
    //     FeaturesService.destroy();
    // };
    //
    // $rootScope.$on('changeTheme', loadTheme);
    //
    // function loadTheme(event, data){
    //     ctrl.theme = data.theme;
    // }
}