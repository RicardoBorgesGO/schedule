/**
 * Created by ricardo on 15/10/17.
 */
angular
    .module('schedule.common')
    .component('sidebar', sideBarComponent());

function sideBarComponent() {
    return {
        templateUrl: 'app/common/sidebar/sidebar.html',
        replace: true,
        controller: 'SidebarController',
        bindings: {
            'features': '<',
            'toggleSidebar': '<',
            'courseData': '<'
        }
    };
}