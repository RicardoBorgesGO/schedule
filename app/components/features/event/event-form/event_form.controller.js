/**
 * Created by ricardo on 11/10/17.
 */
/**
 * Created by ricardo on 11/04/17.
 */
angular
    .module('schedule.events')
    .controller('EventFormController', EventFormController);

function EventFormController() {
    var ctrl = this;

    ctrl.selectedRange = {
        selectedTemplate: 'TW',
        selectedTemplateName: 'This Week',
        dateStart: new Date(),
        dateEnd: new Date(),
        showTemplate: false,
        fullscreen: false
    };

    ctrl.save = function () {
        console.log(ctrl.selectedRange);
    };
}