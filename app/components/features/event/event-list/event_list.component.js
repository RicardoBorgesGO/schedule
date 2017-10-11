/**
 * Created by ricardo on 11/10/17.
 */
angular
    .module('schedule.events')
    .component('eventList', EventListComponent())
    .config(EventListConfig);

function EventListComponent() {
    return {
        templateUrl: 'app/components/features/event/event-list/event_list.html',
        controller: 'EventListController',
        bindings: {
            events: '<'
        }
    };
}

function EventListConfig($stateProvider) {
    $stateProvider
        .state({
            name: 'event.list',
            url: '/list',
            component: 'eventList',
            resolve: {
                events: function(EventService) {
                    return EventService.fetchAll();
                }
            },
            ncyBreadcrumb: {
                parent: 'features',
                label: 'Eventos'
            }
        });
}