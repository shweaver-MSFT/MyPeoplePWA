(function () {

    var LogService = function () {

        // Log a simple string message
        this.Log = function (message) {
            console.log(message);

            // Output to the page.
            // TODO: Add eventing for log requests. That way this log service doesn't need to know about the page.
            document.querySelector("#container").innerHTML += " | " + message;
        };
    };

    var logService = new LogService();
    document.logger = logService;

})();