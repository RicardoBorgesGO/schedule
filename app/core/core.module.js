/**
 * Created by ricardo on 04/04/17.
 */
angular.module("schedule.core", ["ui.router", "ngMaterial", "md.data.table", "ngLodash", "firebase", "ngMaterialDateRangePicker", "ui.calendar"])
    .config(CoreConfig)
    .run(CoreRun);

function CoreConfig($urlRouterProvider, $mdThemingProvider) {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBaIPxNfkPDRRK8iy4wIRQPopLAFM9TNy8",
        authDomain: "schedule-5180d.firebaseapp.com",
        databaseURL: "https://schedule-5180d.firebaseio.com",
        projectId: "schedule-5180d",
        storageBucket: "",
        messagingSenderId: "857334450468"
    };

    // the known route, with missing '/' - let's create alias
    // $urlRouterProvider.when('', '/features/event');

    // the unknown
    // $urlRouterProvider.otherwise('/404');

    firebase.initializeApp(config);

    moment.tz.setDefault("America/Sao_Paulo");
    console.log(moment.tz.guess());
    // moment().tz("America/Sao_Paulo").format();
}

function CoreRun($transitions, $state, AuthService, UserService) {
    $transitions.onStart({
        to: function (state) {
            return !!(state.data && state.data.requiredAuth);
        }
    }, function() {
        return AuthService
            .requireAuthentication()
            .catch(function () {
                return $state.target('login');
            });
    });
    $transitions.onStart({
        to: 'login'
    }, function () {
        if (AuthService.isAuthenticated()) {
            return $state.target('features');
        }
    });

    AuthService.onStateChanged(function(user) {
        if(user) {
            console.log('Signed in as: ', user.uid);
        }
        else {
            console.log('Signed out.');
            $state.target('login');
        }
    });
}