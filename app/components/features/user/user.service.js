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
        var ref_event = ref_events.child(id);
        return $firebaseObject(ref_event).$loaded();
    };

    this.add = function(event) {
        ref_users.push(event);
    };

    this.save = function(event) {
        return event.$save();
    };

    this.remove = function(event) {
        return event.$remove();
    };
}