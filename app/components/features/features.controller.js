/**
 * Created by ricardo on 04/04/17.
 */
angular
    .module('schedule.features')
    .controller('FeaturesController', FeaturesController);

function FeaturesController(FeaturesService, AuthService, UserService, EventService, $scope, $rootScope, $state, $stateParams, uiCalendarConfig) {
    var ctrl = this;
    $scope.events = [];

    $scope.uiConfig = {
        calendar:{
            // height: 450,
            // editable: true,
            // header:{
            //     left: 'title',
            //     center: '',
            //     right: 'today prev,next'
            // },
            defaultView: 'agendaWeek',
            // eventClick: $scope.alertOnEventClick,
            // eventDrop: $scope.alertOnDrop,
            // eventResize: $scope.alertOnResize,
            // eventRender: $scope.eventRender
        }
    };

    ctrl.$onInit = function () {
        $scope.features = ctrl.features;
        $scope.isAdmin = ctrl.isAdmin;

        $scope.schedules = ctrl.schedules;

        console.log($scope.schedules);

        $scope.schedules.forEach(function (res) {
            var date = new Date(res.data);
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var userName;
            var intervalo;

            UserService.fetch(res.user).then(function (user) {
               userName = user.nome;

                EventService.fetch(res.event).then(function (event) {
                    intervalo = event.intervalo;
                    $scope.events.push({title: userName, start: new Date(y, m, d, parseInt(res.hour.substring(0, 2)), parseInt(res.hour.substring(3, 6))),end: new Date(y, m, d, parseInt(res.hour.substring(0, 2)), parseInt(res.hour.substring(3, 6)+intervalo))})
                    $scope.eventSources = [$scope.events];

                    uiCalendarConfig.calendars.calendar.fullCalendar('removeEvents');
                    uiCalendarConfig.calendars.calendar.fullCalendar('addEventSource', $scope.events);

                });
            });
        });

        // console.log($scope.schedules);
    };

    $scope.logout = function () {
        AuthService.logout();
    };

    $scope.back = function () {
        $state.go('login');
    };

    // ctrl.$onInit = function() {
    //     if($state.$current.name === 'features') {
    //         ctrl.features[0].expand = true;
    //         $state.go(ctrl.features[0].subservices[0].link);
    //     } else {
    //         var state = $state.$current.name.split('.');
    //         var theme;
    //
    //         theme = state[0] === 'dashboard' ?
    //             'default'
    //             : state[0] + 'Theme';
    //
    //         loadTheme(null, {theme: theme});
    //     }
    // };
    // ctrl.$onDestroy = function() {
    //     FeaturesService.destroy();
    // };
    //
    // $rootScope.$on('changeTheme', loadTheme);
    //
    // function loadTheme(event, data){
    //     ctrl.theme = data.theme;
    // }
}