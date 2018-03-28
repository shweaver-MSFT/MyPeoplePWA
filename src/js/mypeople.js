(function () {

    var logger = document.logger;
    var app = document.app;

    var MyPeopleService = function () {

        var registeredContactPanel = null;
        var annotationStore = null;

        // 
        function getAnnotationStoreAsync() {
            var contacts = Windows.ApplicationModel.Contacts;

            if (annotationStore == null) {
                return contacts.ContactManager.requestAnnotationStoreAsync(contacts.ContactAnnotationStoreAccessType.appAnnotationsReadWrite)
                    .then(function (e) {
                        annotationStore = e;
                        return annotationStore;
                    });
            }
            else {
                return Promise.resolve(annotationStore);
            }
        }

        //
        function getAnnotationListAsync() {

            return getAnnotationStoreAsync()
                .then(function (annotationStore) {
                    return annotationStore.findAnnotationListsAsync();
                })
                .then(function (annotationLists) {
                    if (!annotationLists || annotationLists.length == 0) {
                        return annotationStore.createAnnotationListAsync();
                    }
                    else {
                        return Promise.resolve(annotationLists[0]);
                    }
                });
        };

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
        this.AnnotateContactAsync = function (contact) {

            if (!window.Windows) {
                logger.Log("MyPeople is not supported on web");
                return;
            }

            getAnnotationListAsync()
                .then(function (annotationList) {

                    var contacts = Windows.ApplicationModel.Contacts;

                    var annotation = new contacts.ContactAnnotation();
                    annotation.contactId = contact.id;
                    annotation.remoteId = contact.remoteId;
                    annotation.supportedOperations = contacts.ContactAnnotationOperations.contactProfile | contacts.ContactAnnotationOperations.share;

                    var appId = app.AppId;
                    annotation.providerProperties.insert("ContactPanelAppID", appId);
                    annotation.providerProperties.insert("ContactShareAppID", appId);

                    return annotationList.trySaveAnnotationAsync(annotation)
                        .then(function () {
                            return Promise.resolve(annotation);
                        });
                });
        }.bind(this);

        // You can pin contacts using the PinnedContactManager. 
        // The RequestPinContactAsync method provides the user with a confirmation dialog, 
        // so it must be called from your Application Single - Threaded Apartment(ASTA, or UI) thread.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.PinContact = function (contact) {
            if (!window.Windows) {
                logger.Log("MyPeople is not supported on web");
                return;
            }

            var pinnedContactManager = this.getPinnedContactManager();
            pinnedContactManager.requestPinContactAsync(contact, Windows.ApplicationModel.Contacts.PinnedContactSurface.taskbar);
        }.bind(this);

        // You can now pin and unpin contacts using the PinnedContactManager.
        // The RequestUnpinContactAsync method provides the user with a confirmation dialog,
        // so it must be called from your Application Single - Threaded Apartment(ASTA, or UI) thread.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.UnpinContactAsync = function (contact) {
            if (!window.Windows) {
                logger.Log("MyPeople is not supported on web");
                return;
            }

            var pinnedContactManager = this.getPinnedContactManager();
            pinnedContactManager.requestUnpinContactAsync(contact, Windows.ApplicationModel.Contacts.PinnedContactSurface.taskbar);
        }.bind(this);

        // You can pin multiple contacts at the same time using the PinnedContactManager.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.PinMultipleContactsAsync = function (contacts) {
            if (!window.Windows) {
                logger.Log("MyPeople is not supported on web");
                return;
            }

            var pinnedContactManager = this.getPinnedContactManager();
            pinnedContactManager.requestPinContactsAsync(contacts, Windows.ApplicationModel.Contacts.PinnedContactSurface.taskbar);
        }.bind(this);

        // There is currently no batch operation for unpinning contacts.
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#pinning-and-unpinning-contacts
        this.UnpinMultipleContacts = function (contacts) {
            logger.Log("There is currently no batch operation for unpinning contacts.");
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
                logger.Log("Registered ContactPanel LaunchFullAppRequested");
                document.activation.LaunchSelf();

                // Close the panel on app launch
                registeredContactPanel.ClosePanel();
            }).bind(this);

            // Occurs when the Contact Panel is closing.
            contactPanel.addEventListener("closing", function () {
                logger.Log("Registered ContactPanel Closing");
            }).bind(this);

            // Set the header color
            contactPanel.headerColor = Windows.UI.Colors.Red;

        }.bind(this);
    };

    var myPeopleService = new MyPeopleService();
    document.myPeople = myPeopleService;

})();