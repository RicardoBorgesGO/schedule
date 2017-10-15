/**
 * Created by ricardo on 04/04/17.
 */
angular
    .module('schedule.features')
    .controller('FeaturesController', FeaturesController);

function FeaturesController(FeaturesService, AuthService, $rootScope, $state) {
    var ctrl = this;

    ctrl.logout = function () {
        AuthService.logout();
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
    //
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