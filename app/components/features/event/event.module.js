/**
 * Created by marco on 17/06/17.
 */
angular
    .module('schedule.events', [
        'schedule.common'
    ])
    .config(EventConfig)
    .factory('eventData', EventData);

function EventConfig($stateProvider, $mdThemingProvider) {
    var state = {
        name: 'event',
        parent: 'features',
        url: '/event',
        redirectTo: 'event.list'
    };

    $stateProvider.state(state);

    $mdThemingProvider
        .theme('usersTheme')
        .primaryPalette('green')
        .accentPalette('grey');
}

function EventData() {
    return {
        name: 'Eventos',
        icon: 'schedule',
        link: 'event.list'
    };
}