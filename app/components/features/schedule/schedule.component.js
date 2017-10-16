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
            schedules: '<',
            schedulesUser: '<'
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
                schedulesUser: function (ScheduleService, AuthService) {
                    return AuthService.getUserData().then(function (res) {
                        return ScheduleService.fetchSchedulesByUser(Object.keys(res)[0]);
                    });
                },
                schedules: function(EventService, schedulesUser) {
                    return EventService.fetchAll();
                }
            },
            ncyBreadcrumb: {
                parent: 'features',
                label: 'Schedule'
            }
        });
}