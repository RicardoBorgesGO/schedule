/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule', [
        'schedule.common'
    ])
    .config(ScheduleConfig)
    .factory('scheduleData', ScheduleData);

function ScheduleConfig($stateProvider, $mdThemingProvider) {
    var state = {
        name: 'schedule',
        parent: 'features',
        url: '/schedule',
        redirectTo: 'schedule'
    };

    $stateProvider.state(state);

    $mdThemingProvider
        .theme('usersTheme')
        .primaryPalette('green')
        .accentPalette('grey');
}

function ScheduleData() {
    return {
        name: 'Schedules',
        icon: 'storage',
        link: 'event.list'
    };
}