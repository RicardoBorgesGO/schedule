/**
 * Created by ricardo on 04/04/17.
 */
angular
    .module('schedule.features')
    .service('FeaturesService', FeaturesService);

function FeaturesService($injector, $state) {
    var allFeatures = [];
    var changed = false;

    this.loadSidenav = function(features) {
        angular.forEach(features, function(feature) {
            var data = $injector.get(feature + 'Data');
            data.expand = false;
            if($state.$current.includes[feature]) {
                data.expand = true;
            }

            allFeatures.push(data);
        });

        return allFeatures;
    };

    this.isChanged = function () {
        return changed;
    };

    this.setChanged = function (value) {
        changed = value;
    };

    this.getFeatures = function() {
        return allFeatures;
    };

    this.destroy = function() {
        allFeatures = [];
    };
}