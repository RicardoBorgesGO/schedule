/**
 * Created by ricardo on 04/04/17.
 */
angular.module("schedule.core", ["ui.router", "ngMaterial", "md.data.table", "ngLodash", "ngSanitize", "firebase", "ngMaterialDateRangePicker"])
.config(CoreConfig);

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
    $urlRouterProvider.when('', '/features/event');

    // the unknown
    $urlRouterProvider.otherwise('/404');

    firebase.initializeApp(config);
}