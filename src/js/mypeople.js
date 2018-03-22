(function () {

    var MyPeopleService = function () {

        this.CreateContact = function (contactId, firstName, lastName, email, phone) {
            if (!window.Windows) {
                console.log("MyPeople is not supported on web");
                return;
            }

            var apiInformation = Windows.Foundation.Metadata.ApiInformation;

            if (apiInformation.IsApiContractPresent("Windows.Foundation.UniversalApiContract", 5)) {

                var contacts = Windows.ApplicationModel.Contacts;

                // Create a new contact annotation
                var annotation = new contacts.ContactAnnotation();
                annotation.contactId = contactId;
                annotation.firstName = firstName;
                annotation.lastName = lastName;
                annotation.email = email;
                annotation.phone = phone;

                // Add appId and contact panel support to the annotation
                var appId = "MyPeoplePWA_80c4904e66sn0";
                annotation.ProviderProperties.add("ContactPanelAppID", appId);
                annotation.SupportedOperations = contacts.ContactAnnotationOperations.contactProfile;

                // Save annotation to contact annotation list
                contacts.ContactAnnotationList.trySaveAnnotationAsync(annotation);
            }
        };

        this.DeleteContact = function (contactId) {

        };

        this.GetContactList = function () {

        };

        this.GetContactAnnotationList = function () {

        };
    };

    var myPeopleService = new MyPeopleService();
    document.myPeople = myPeopleService;

})();