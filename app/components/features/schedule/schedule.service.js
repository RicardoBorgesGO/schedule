/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .service('ScheduleService', ScheduleService);

function ScheduleService($firebaseObject, $firebaseArray, $http, $q) {
    var ref = firebase.database().ref();
    var ref_events = ref.child('schedule');

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