/**
 * Created by ricardo on 13/10/17.
 */
angular
    .module('schedule.user')
    .component('userForm', UserFormComponent())
    .config(UserFormConfig);

function UserFormComponent() {
    return {
        templateUrl: 'app/components/features/user/user-form/user_form.html',
        controller: 'UserFormController',
        bindings: {
            events: '<',
            userData: '<'
        }
    };
}

function UserFormConfig($stateProvider) {
    var states = [{
        name: 'user.new',
        url: '/new',
        component: 'userForm',
        resolve: {
            events: function (EventService) {
                return EventService.fetchAll();
            }
        },
        ncyBreadcrumb: {
            parent: 'user.list',
            label: 'Cadastro de eventos'
        }
    },{
        name: 'user.edit',
        url: '/edit/:id',
        component: 'userForm',
        resolve: {
            userData: function($transition$, UserService) {
                return UserService.fetch($transition$.params().id);
            },
            events: function (EventService) {
                return EventService.fetchAll();
            }
        },
        ncyBreadcrumb: {
            parent: 'user.list',
            label: 'Edição de evento'
        }
    }];

    $stateProvider.state(states[0]);
    $stateProvider.state(states[1]);
}