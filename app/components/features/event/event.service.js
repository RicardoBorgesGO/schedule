/**
 * Created by ricardo on 11/10/17.
 */
angular
    .module('schedule.events')
    .service('EventService', EventService);

function EventService($firebaseObject, $firebaseArray, $http, $q) {
    var ref = firebase.database().ref();
    var ref_events = ref.child('events');

    this.fetchAll = function() {
        return $firebaseArray(ref_events).$loaded();
    };

    this.fetch = function(id) {
        var ref_event = ref_events.child(id);
        return $firebaseObject(ref_event).$loaded();
    };

    this.add = function(event) {
        ref_events.push(event);
        // return $q.when(1);
    };

    this.save = function(event) {
        return event.$save();
    };

    this.remove = function(event) {
        return event.$remove();
    };
}