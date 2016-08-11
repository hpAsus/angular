// Tree View Service
// =====================================================================================================================
(function () {

    var treeviewServiceFunc = function ($http) {


        // Tree
        // =====================================================================

        // NODE ENTITY
        // =====================================================================
        function NODE() {
            var self = this;
            self.id = randomIDGenerator();
        }
        NODE.prototype.getChildren = function () {

        };
        NODE.prototype.addChildren = function (children) {
            
        };

        // Helpers
        // =====================================================================
        function randomIDGenerator() {

        }

        // Trees
        // =====================================================================
        this.trees = function () {
            return {
                add: function () {
                    $http({
                        method: 'GET',
                        url: '/api/getTree'
                    }).then(function (res) {
                        console.log(res.data);
                        return res.data;
                    });
                },
                remove: function () {

                }
            }
        };

        // Nodes
        // =====================================================================
        this.nodes = function () {

            return {
                add: function (node) {

                },
                delete: function () {

                }
            }
            
        }
    };

    angular.module('app').service('treeviewService', ['$http', treeviewServiceFunc]);

})();