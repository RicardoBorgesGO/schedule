/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.auth')
    .component('login', LoginComponent())
    .config(LoginConfig);

function LoginComponent() {
    return {
        templateUrl: 'app/components/auth/login/login.html',
        controller: 'LoginController'
    };
}

function LoginConfig($stateProvider) {
    $stateProvider
        .state('login', {
            name: 'login',
            url: '/login',
            component: 'login',
        });
}