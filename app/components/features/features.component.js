/**
 * Created by ricardo on 04/04/17.
 */
angular
    .module('schedule.features')
    .component('features', featuresComponent())
    .config(featuresConfig);

function featuresComponent() {
    return {
        templateUrl: 'app/components/features/features.html',
        controller: 'FeaturesController',
        bindings: {
            user: '<',
            features: '<',
            isAdmin: '<',
            schedules: '<'
        }
    }
}

function featuresConfig($stateProvider) {
    var state = {
        name: 'features',
        url: '/features',
        component: 'features',
        data: {
            requiredAuth: true
        },
        resolve: {
            user: function (AuthService) {
                return AuthService.getUserData();
            },
            isAdmin: function (user) {
                return user[Object.keys(user)[0]].isAdmin;
            },
            features: function (FeaturesService, user) {
                var services = [];
                if (user[Object.keys(user)[0]].isAdmin){
                    services = ['features', 'user', 'event'];
                }

                return FeaturesService.loadSidenav(services);
            },
            schedules: function (ScheduleService, UserService, EventService) {
                return ScheduleService.fetchAll();
            }
        }
    };

    $stateProvider.state(state);
}