/**
 * Created by ricardo on 04/04/17.
 */
angular.module('schedule.features', [
    'schedule.common',
    'schedule.events',
    'schedule.schedule',
    'schedule.user'
]).factory('featuresData', FeaturesData);;

function FeaturesData() {
    return {
        name: 'Início',
        icon: 'home',
        link: 'features'
    };
};