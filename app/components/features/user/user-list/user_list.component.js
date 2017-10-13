/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.user')
    .component('userList', UserListComponent())
    .config(UserListConfig);

function UserListComponent() {
    return {
        templateUrl: 'app/components/features/user/user-list/user_list.html',
        controller: 'UserListController',
        bindings: {
            users: '<'
        }
    };
}

function UserListConfig($stateProvider) {
    $stateProvider
        .state({
            name: 'user.list',
            url: '/list',
            component: 'userList',
            resolve: {
                users: function(UserService) {
                    return UserService.fetchAll();
                }
            },
            ncyBreadcrumb: {
                parent: 'features',
                label: 'Usuarios'
            }
        });
}