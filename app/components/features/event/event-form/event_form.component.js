/**
 * Created by ricardo on 11/10/17.
 */
angular
    .module('schedule.events')
    .component('eventForm', EventFormComponent())
    .config(EventFormConfig);

function EventFormComponent() {
    return {
        templateUrl: 'app/components/features/event/event-form/event_form.html',
        controller: 'EventFormController',
        bindings: {
            event: '<'
        }
    };
}

function EventFormConfig($stateProvider) {
    var states = [{
        name: 'event.new',
        url: '/new',
        component: 'eventForm',
        ncyBreadcrumb: {
            parent: 'event.list',
            label: 'Cadastro de eventos'
        }
    },{
        name: 'event.edit',
        url: '/edit/:id',
        component: 'eventForm',
        resolve: {
            event: function($transition$, EventService) {
                return EventService.fetch($transition$.params().id);
            }
        },
        ncyBreadcrumb: {
            parent: 'event.list',
            label: 'Edição de evento'
        }
    }];

    $stateProvider.state(states[0]);
    $stateProvider.state(states[1]);
}