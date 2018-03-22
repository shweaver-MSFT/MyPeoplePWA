(function () {

    var ActivationService = function () {

        // private
        function onLaunched(args) {
            console.log("Launch activated");

            var activation = Windows.ApplicationModel.Activation;

            if (args && (args.previousExecutionState == activation.ApplicationExecutionState.terminated || args.previousExecutionState == activation.ApplicationExecutionState.closedByUser)) {
                // TODO: Populate the UI with the previously saved application data
            }
            else {
                // TODO: Populate the UI with defaults
            }
        }

        // private
        function onShareTargetActivated(args) {
            console.log("ShareTarget Activated");
        }

        // private
        function onContactPanelActivated(args) {
            console.log("ContectPanel Activated");
        }

        // private
        function onWebActivated(args) {
            console.log("Web Activated");
        }

        // The most recent activation args
        this.LastActivationArgs;

        // Handles app activation
        this.OnActivated = function (args) {
            console.log("OnActivated");

            this.LastActivationArgs = args;

            if (!window.Windows) {
                onWebActivated(args);
                return;
            }

            if (args && args.kind != undefined) {

                var activation = Windows.ApplicationModel.Activation;

                switch (args.kind) {
                    case activation.ActivationKind.launch: onLaunched(args); return;
                    case activation.ActivationKind.shareTarget: onShareTargetActivated(args); return;
                    case activation.ActivationKind.contactPanel: onContactPanelActivated(args); return;
                }

                console.log("Unhandled activation kind: " + args.kind);
            }
            else {
                console.log("Unhandled activation: Missing args - " + args);
            }
        }.bind(this);
    };

    var activationService = new ActivationService();
    document.activation = activationService;

})();