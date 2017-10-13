/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .component('scheduleList', ScheduleListComponent())
    .config(ScheduleListConfig);

function ScheduleListComponent() {
    return {
        templateUrl: 'app/components/features/schedule/schedule.html',
        controller: 'ScheduleListController',
        bindings: {
            schedules: '<'
        }
    };
}

function ScheduleListConfig($stateProvider) {
    $stateProvider
        .state({
            name: 'schedule.list',
            url: '/list',
            component: 'scheduleList',
            resolve: {
                schedules: function(EventService) {
                    return EventService.fetchAll();
                }
            },
            ncyBreadcrumb: {
                parent: 'features',
                label: 'Schedule'
            }
        });
}