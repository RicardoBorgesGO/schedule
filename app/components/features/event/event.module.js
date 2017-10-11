/**
 * Created by marco on 17/06/17.
 */
angular
    .module('schedule.events', [
        'schedule.common'
    ])
    .factory('eventData', EventData);

function EventData() {
    return {
        name: 'Eventos',
        icon: 'create_new_folder',
        link: 'event'
    };
}