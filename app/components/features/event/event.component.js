/**
 * Created by marco on 17/06/17.
 */
angular
    .module('schedule.events')
    .component('events', eventComponent())
    .config(eventConfig);

function eventComponent() {
    return {
        templateUrl: 'app/components/features/event/event.html',
        controller: 'EventController'
    };
}

function eventConfig($stateProvider) {
    $stateProvider
        .state({
            name: 'event',
            parent: 'features',
            url: '/event',
            component: 'events'
        });
}