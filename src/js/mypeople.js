(function () {

    var MyPeopleService = function () {

        var registeredContactPanel;

        // The PinnedContactManager is used to manage which contacts are pinned to the taskbar. 
        // This class lets you pin and unpin contacts, determine whether a contact is pinned, 
        // and determine if pinning on a particular surface is supported by the system your application is currently running on.
        // You can retrieve the PinnedContactManager object using the GetDefault method:
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#the-pinnedcontactmanager-class
        function getPinnedContactManager() {
            return Windows.ApplicationModel.Contacts.PinnedContactManager.GetDefault();
        }

        // Annotations are pieces of data from your application that are associated with a contact. 
        // The annotation must contain the activatable class corresponding to your desired view in its ProviderProperties member, 
        // and declare support for the ContactProfile operation.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#annotating-contacts
        this.AnnotateContact = function (contact) {

            if (!window.Windows) {
                console.log("MyPeople is not supported on web");
                return;
            }

            var apiInformation = Windows.Foundation.Metadata.ApiInformation;
            if (apiInformation.IsApiContractPresent("Windows.Foundation.UniversalApiContract", 5)) {

                var annotationList = document.contacts.GetContactAnnotationList();
                if (null == annotationList) {
                    return;
                }

                var contacts = Windows.ApplicationModel.Contacts;

                // Create a new contact annotation
                var annotation = new contacts.ContactAnnotation();
                annotation.contactId = contact.Id;

                // Remote ID: The identifier of the user relevant for this app. When this app is
                // launched into from the People App, this id will be provided as context on which user
                // the operation (e.g. ContactProfile) is for.
                annotation.RemoteId = contact.RemoteId;

                // Add appId and contact panel support to the annotation
                var appId = "MyPeoplePWA_80c4904e66sn0";
                annotation.ProviderProperties.add("ContactPanelAppID", appId);

                // The supported operations flags indicate that this app can fulfill these operations
                // for this contact. These flags are read by apps such as the People App to create deep
                // links back into this app. This app must also be registered for the relevant
                // protocols in the Package.appxmanifest (in this case, ms-contact-profile).
                annotation.SupportedOperations = contacts.ContactAnnotationOperations.contactProfile;

                // Save annotation to contact annotation list
                if (!annotationList.trySaveAnnotationAsync(annotation)) {
                    console.log("Failed to save annotation for contact to the store.");
                    return;
                }
            }
        }.bind(this);

        // You can pin contacts using the PinnedContactManager. 
        // The RequestPinContactAsync method provides the user with a confirmation dialog, 
        // so it must be called from your Application Single - Threaded Apartment(ASTA, or UI) thread.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.PinContact = function (contact) {
            if (!window.Windows) {
                console.log("MyPeople is not supported on web");
                return;
            }

            var pinnedContactManager = this.getPinnedContactManager();
            pinnedContactManager.requestPinContactAsync(contact, Windows.ApplicationModel.Contacts.PinnedContactSurface.taskbar);
        }.bind(this);

        // You can now pin and unpin contacts using the PinnedContactManager.
        // The RequestUnpinContactAsync method provides the user with a confirmation dialog,
        // so it must be called from your Application Single - Threaded Apartment(ASTA, or UI) thread.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.UnpinContact = function (contact) {
            if (!window.Windows) {
                console.log("MyPeople is not supported on web");
                return;
            }

            var pinnedContactManager = this.getPinnedContactManager();
            pinnedContactManager.requestUnpinContactAsync(contact, Windows.ApplicationModel.Contacts.PinnedContactSurface.taskbar);
        }.bind(this);

        // You can pin multiple contacts at the same time using the PinnedContactManager.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.PinMultipleContacts = function (contacts) {
            if (!window.Windows) {
                console.log("MyPeople is not supported on web");
                return;
            }

            var pinnedContactManager = this.getPinnedContactManager();
            pinnedContactManager.requestPinContactsAsync(contacts, Windows.ApplicationModel.Contacts.PinnedContactSurface.taskbar);
        }.bind(this);

        // There is currently no batch operation for unpinning contacts.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.UnpinMultipleContacts = function (contacts) {
            if (!window.Windows) {
                console.log("MyPeople is not supported on web");
                return;
            }

            for(var i = 0; i < contacts.length; i++) {
                this.UnpinContact(contact[i]);
            }
        }.bind(this);

        // The ContactPanel object has two events your application should listen for:
        //
        //   * The LaunchFullAppRequested event is sent when the user has invoked the UI element that 
        //     requests that your full application be launched in its own window.
        //     Your application is responsible for launching itself, passing along all necessary context.
        //     You are free to do this however you’d like(for example, via protocol launch).
        //
        //   * The Closing event is sent when your application is about to be closed, allowing you to save any context.
        //
        // The ContactPanel object also allows you to set the background color of the contact panel header
        // (if not set, it will default to the system theme) and to programmatically close the contact panel.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#running-in-the-contact-panel
        this.RegisterContactPanel = function (contactPanel) {

            registeredContactPanel = contactPanel;

            // Occurs when the user clicks the Launch Full App button in the Contact Panel.
            contactPanel.addEventListener("launchFullAppRequested", function () {
                console.log("Registered ContactPanel LaunchFullAppRequested");
                document.activation.LaunchSelf();

                // Close the panel on app launch
                registeredContactPanel.ClosePanel();
            }).bind(this);

            // Occurs when the Contact Panel is closing.
            contactPanel.addEventListener("closing", function () {
                console.log("Registered ContactPanel Closing");
            }).bind(this);

            // Set the header color
            contactPanel.headerColor = Windows.UI.Colors.Red;

        }.bind(this);
    };

    var myPeopleService = new MyPeopleService();
    document.myPeople = myPeopleService;

})();