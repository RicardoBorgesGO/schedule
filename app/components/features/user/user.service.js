/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.user')
    .service('UserService', UserService);

function UserService($firebaseObject, $firebaseArray) {
    var ref = firebase.database().ref();
    var ref_users = ref.child('users');

    this.fetchAll = function() {
        return $firebaseArray(ref_users).$loaded();
    };

    this.fetch = function(id) {
        var ref_user = ref_users.child(id);
        return $firebaseObject(ref_user).$loaded();
    };

    this.fetchByUID = function(uid) {
        return ref_users.orderByChild('uid').equalTo(uid).once("value").then(function (snapshot) {
            return snapshot.val();
        })
        // return user;
        // var ref_user = ref_users.orderByChild('uid').equalTo(uid);
        // return $firebaseObject(ref_user).$loaded();
    };

    this.add = function(user) {
        ref_users.push(user);
    };

    this.save = function(user) {
        return user.$save();
    };

    this.remove = function(user) {
        console.log(user);
        return ref_users.child(user.$id).remove();
    };
}