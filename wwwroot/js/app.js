(function () {

    var App = function () {

        this.AppId = "MyPeoplePWA_80c4904e66sn0";

        // Initialize the TitleBar
        if (window.Windows) {

            var titleBarColor = { a: 255, r: 32, g: 32, b: 32 };
            var titleBarTextColor = { a: 255, r: 230, g: 230, b: 230 };
            var titleBar = Windows.UI.ViewManagement.ApplicationView.getForCurrentView().titleBar;
            titleBar.backgroundColor = titleBarColor;
            titleBar.buttonBackgroundColor = titleBarColor;
            titleBar.foregroundColor = titleBarTextColor;
        }
    };

    var app = new App();
    document.app = app;

})();