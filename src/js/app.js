(function () {

    var App = function () {

        this.AppId = "MyPeoplePWA_80c4904e66sn0";

        this.SetActivationType = function (activationType) {
            document.querySelector("#activationType").textContent = activationType;
        }
    };

    var app = new App();
    document.app = app;

})();