/**
 * Created by ricardo on 04/04/17.
 */
angular
    .module('schedule.features')
    .controller('FeaturesController', FeaturesController);

function FeaturesController(FeaturesService, $rootScope, $state) {
    var ctrl = this;

    ctrl.isEditorChanged = function () {
        return FeaturesService.isChanged();
    };

    ctrl.generatePPC = function (courseData) {
        var docDefinition = generateData(courseData);

        // const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfMake.fonts = {
            'Calibri' : {
                normal: 'Calibri.ttf',
                bold: 'Calibri-Bold.ttf',
                italics: 'Calibri-Italic.ttf'
            },
            'Roboto': {
                normal: 'Roboto-Regular.ttf',
                bold: 'Roboto-Medium.ttf',
                italics: 'Roboto-Italic.ttf',
                bolditalics: 'Roboto-Italic.ttf'
            }
        };

        // open the PDF in a new window
        pdfMake.createPdf(docDefinition).open();
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
    //
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