angular
    .module('schedule.auth')
    .service('AuthService', AuthService);

function AuthService($state, $window, $firebaseObject, $firebaseArray, $firebaseAuth, UserService, ToastService) {
    var ref = firebase.database().ref().child('users');
    var auth = $firebaseAuth();
    var authData = null;

    this.createUser = function (userData) {
        return auth
            .$createUserWithEmailAndPassword(userData.email, userData.password)
            .then(function (response) {
                userData.uid = response.uid;
                UserService.add(userData);
                // console.log(response);
            });
    };
    
    this.removeUser = function (user) {
        if (user.uid) {
            auth.$deleteUser(user.uid).then(function (response) {
                console.log(response);
                UserService.remove(user).then(function (res) {
                    ToastService.success('removed');
                });
            });
        } else {
            console.log('Não tem uid');
        }
    };

    this.login = function (email, password) {
        return auth
            .$signInWithEmailAndPassword(email, password)
            .then(function (response) {

                // UserService.fetchByUID(response.uid).then(function (res) {
                //     var user;
                //     for (var property in res) {
                //         user = res[property];
                //     }

                    authData = response;
                    // authData.isAdmin = user.isAdmin;
                    return authData;
                // });
            });
    };

    this.logout = function () {
        return auth
            .$signOut()
            .then(function () {
                authData = null;
                $state.go('login');
            });
    };

    this.requireAuthentication = function () {
        return auth
            .$waitForSignIn()
            .then(function (user) {
                authData = user;
                return auth.$requireSignIn();
            });
    };

    this.onStateChanged = function(callback) {
        return auth
            .$onAuthStateChanged(callback);
    };

    this.isAuthenticated = function () {
        return !!authData;
    };

    this.getUserData = function() {
        // var user = {
        //     "name" : "Ricardo Borges",
        //     "services": ["event"]
        // }
        // var ref_users = ref.child('users');

        var ref_user = ref.orderByChild('uid').equalTo(authData.uid);
        return $firebaseObject(ref_user).$loaded();

        // UserService.fetchByUID(authData.uid).then(function (res) {
        //     console.log(res);
        //     return $firebaseObject(res).$loaded();
        // });
        // console.log(ref_user);

        // return user;
    };
}