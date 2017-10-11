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
            features: '<'
        }
    }
}

function featuresConfig($stateProvider) {
    var state = {
        name: 'features',
        url: '/features',
        component: 'features',
        data: {
            requiredAuth: false
        },
        resolve: {
            user: function (AuthService) {
                return AuthService.getUserData();
            },
            features: function (FeaturesService, user) {
                return FeaturesService.loadSidenav(user.services);
            }
        }
    };

    $stateProvider.state(state);
}