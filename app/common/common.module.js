/**
 * Created by ricardo on 04/04/17.
 */
angular
    .module('schedule.common', [
        'schedule.core'
    ])
   .config(commonConfig);

function commonConfig($stateProvider, $urlRouterProvider,
                      $uiViewScrollProvider, $mdThemingProvider) {
    var state = {
        name: '404',
        url: '/404',
        templateUrl: './404.html',
    };

    $stateProvider.state(state);

    $urlRouterProvider
        .when('', '/login')
        .when('/', '/login')
        .otherwise('/404');

    $uiViewScrollProvider.useAnchorScroll();

   /* DEFAULT THEME */
    $mdThemingProvider
        .theme('default')
        .primaryPalette('light-green', {
            'default': '700',
            'hue-1': '600',
            'hue-2': '700',
            'hue-3': '800'
        })
        .accentPalette('blue-grey', {
            'default': '400'
        });

    $mdThemingProvider.setDefaultTheme('default');
    $mdThemingProvider.alwaysWatchTheme(true);

    // Register dark theme
    $mdThemingProvider.theme('docs-dark').dark();
}