// Loader Service
// =====================================================================================================================
(function () {

    var loaderServiceFunc = function () {
        this._loader = null;

        //Add loader
        this.addLoader = function () {

            //check if loader already exists id dom
            if (!document.getElementsByClassName('loader-overlay').length) {

                var loaderContainer = document.createElement('div');
                var spin = document.createElement('div');

                var body = angular.element(document.getElementsByTagName('body'));
                loaderContainer.classList.add('loader-overlay');
                loaderContainer.classList.add('none');

                spin.className = 'spin';
                loaderContainer.appendChild(spin);

                this._loader = angular.element(loaderContainer);
                body.append(this._loader);
            }

        };

        //Show loader
        this.showLoader = function () {
            this._loader.removeClass('none');
        };

        //Hide loader
        this.hideLoader = function () {
            this._loader.addClass('none');
        };

    };

    angular.module('app').service('loaderService', [loaderServiceFunc]);

})();