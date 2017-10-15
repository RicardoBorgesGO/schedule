/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.user', [
        'schedule.common'
    ])
    .config(UserConfig)
    .factory('userData', UserData);

function UserConfig($stateProvider, $mdThemingProvider) {
    var state = {
        name: 'user',
        parent: 'features',
        url: '/user',
        redirectTo: 'user.list'
    };

    $stateProvider.state(state);

    $mdThemingProvider
        .theme('usersTheme')
        .primaryPalette('green')
        .accentPalette('grey');
}

function UserData() {
    return {
        name: 'Usuários',
        icon: 'user',
        link: 'user.list'
    };
}