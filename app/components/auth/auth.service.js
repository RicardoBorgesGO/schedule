angular
    .module('schedule.auth')
    .service('AuthService', AuthService);

function AuthService($firebaseObject, $firebaseArray, $firebaseAuth) {
    var ref = firebase.database().ref().child('users');
    var auth = $firebaseAuth();
    var authData = null;

    this.createUser = function (email, password) {
        return auth
            .$createUserWithEmailAndPassword(email, password)
            .then(function (response) {
                console.log(response);
                // authData = response;
                // return authData;
            });
    };

    this.login = function (email, password) {
        return auth
            .$signInWithEmailAndPassword(email, password)
            .then(function (response) {
                authData = response;
                return authData;
            });
    };

    this.logout = function () {
        // return auth
        //     .$signOut()
        //     .then(function () {
        //         authData = null;
        //     });
    };

    this.requireAuthentication = function () {
        // return auth
        //     .$waitForSignIn()
        //     .then(function (user) {
        //         authData = user;
        //         return auth.$requireSignIn();
        //     });
    };

    this.onStateChanged = function(callback) {
        // return auth
        //     .$onAuthStateChanged(callback);
    };

    this.isAuthenticated = function () {
        // return !!authData;
    };

    this.getUserData = function() {
        var user = {
            "name" : "Ricardo Borges",
            "services": ["event"]
        }
        // var ref_user = ref.child(authData.uid);
        // return $firebaseObject(ref_user).$loaded();
        return user;
    };
}