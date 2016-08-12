// Tree View Controller
// =====================================================================================================================
(function () {

    var treeviewCtrlFunc = function ($scope, treeviewService, $http) {
        var vm = this;

        $http({
            method: 'GET',
            url: '/api/getTree'
        }).then(function(res) {

            console.log('hahas');

            var treeJSON = res.data.tree;
            console.log(treeJSON.metadata.title);
            var tree = treeviewService.trees();
            tree.add(treeJSON.metadata.title);
            //Process response data with methods from treeviewService

            // console.log(dataJSON);
            console.log(tree);
            // console.log(dataJSON.metadata.title);

            // var tree = treeviewService.trees();
            // tree.add('test');


            // Processed result apply to view

        });


    };


    angular.module('app').controller('treeviewCtrl', ['$scope', 'treeviewService', '$http', treeviewCtrlFunc]);

})();