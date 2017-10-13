/**
 * Created by ricardo on 12/10/17.
 */
angular
    .module('schedule.schedule')
    .component('scheduleForm', ScheduleFormComponent())
    .config(ScheduleFormConfig);

function ScheduleFormComponent() {
    return {
        templateUrl: 'app/components/features/schedule/schedule-form/schedule_form.html',
        controller: 'ScheduleFormController'
    };
}

function ScheduleFormConfig($stateProvider) {
    var states = [{
        name: 'schedule.new',
        url: '/new',
        component: 'scheduleForm',
        ncyBreadcrumb: {
            parent: 'schedule.list',
            label: 'Cadastro de eventos'
        }
    },{
        name: 'schedule.edit',
        url: '/edit/:id',
        component: 'scheduleForm',
        resolve: {
            scheduleData: function($transition$, EventService) {
                return EventService.fetch($transition$.params().id);
            }
        },
        ncyBreadcrumb: {
            parent: 'schedule.list',
            label: 'Edição de evento'
        }
    }];

    $stateProvider.state(states[0]);
    $stateProvider.state(states[1]);
}