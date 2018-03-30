(function () {

    var logger = document.logger;
    var app = document.app;

    var ActivationService = function () {

        // 
        function onLaunched(args) {
            app.SetActivationType("Launch activated");

            var activation = Windows.ApplicationModel.Activation;

            if (args && (args.previousExecutionState == activation.ApplicationExecutionState.terminated || args.previousExecutionState == activation.ApplicationExecutionState.closedByUser)) {
                // TODO: Populate the UI with the previously saved application data
            }
            else {
                // TODO: Populate the UI with defaults
            }
        }

        // 
        function onProtocolActivated(args) {
            app.SetActivationType("Protocol Activated");

            var protocol = args.Uri.absoluteUri;
            // TODO: Handle protocol activation
        };

        // 
        function onShareTargetActivated(args) {
            app.SetActivationType("ShareTarget Activated");
            // TODO: Handle shareTarget activation
        }

        // When your application is activated with this contract, it will receive a ContactPanelActivatedEventArgs object. 
        // This contains the ID of the Contact that your application is trying to interact with on launch, and a ContactPanel object.
        // You should keep a reference to this ContactPanel object, which will allow you to interact with the panel.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#running-in-the-contact-panel
        function onContactPanelActivated(args) {
            app.SetActivationType("ContectPanel Activated");

            var contactPanel = args.contactPanel; // TODO: Check that this is the right arg
            document.myPeople.RegisterContactPanel(contactPanel);
        }

        // 
        function onWebActivated(args) {
            app.SetActivationType("Web Activated");
        }

        // The most recent activation args
        this.LastActivationArgs;

        // Handles app activation
        this.OnActivated = function (args) {

            this.LastActivationArgs = args;

            if (!window.Windows) {
                onWebActivated(args);
                return;
            }

            if (args && args.kind != undefined) {

                var activation = Windows.ApplicationModel.Activation;

                switch (args.kind) {
                    case activation.ActivationKind.launch: onLaunched(args); return;
                    case activation.ActivationKind.protocol: onProtocolActivated(args); return;
                    case activation.ActivationKind.shareTarget: onShareTargetActivated(args); return;
                    case activation.ActivationKind.contactPanel: onContactPanelActivated(args); return;
                }
            }

            logger.Log("Unhandled activation: Missing args - " + args);
            // TODO: Handle activation with invalid/missing args

        }.bind(this);

        // Protocol launch this app.
        // This is useful to call when activating from a ContactPanel.
        this.LaunchSelf = function () {
            var uri = new Windows.Foundation.Uri("mypeoplepwa://");
            var options = new Windows.System.LauncherOptions();
            Windows.System.Launcher.launchUriAsync(uri, options)
                .then(function (success) {
                    if (success) {
                        // URI launched
                    } else {
                        // URI launch failed
                    }
                });
        }
    };

    var activationService = new ActivationService();
    document.activation = activationService;

    // Register for activation
    if (window.Windows && window.Windows.UI && window.Windows.UI.WebUI) {
        Windows.UI.WebUI.WebUIApplication.addEventListener("activated", activationService.OnActivated);
    }
    else {
        // Running on web, not UWP
        activationService.OnActivated();
    }

})();