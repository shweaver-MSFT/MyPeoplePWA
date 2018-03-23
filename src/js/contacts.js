(function () {

    var ContactsService = function () {

        // To allow contacts from your application to appear in the taskbar via the My People pane, 
        // you need to write them to the Windows contact store.
        //
        // Your application must also write an annotation to each contact. 
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#annotating-contacts
        this.CreateContact = function (contactId, firstName, lastName, email, phone) {
            /*
            Contact contact1 = new Contact();
            contact1.FirstName = "TestContact1";

            ContactEmail email1 = new ContactEmail();
            email1.Address = "TestContact1@contoso.com";
            contact1.Emails.Add(email1);

            ContactPhone phone1 = new ContactPhone();
            phone1.Number = "4255550100";
            contact1.Phones.Add(phone1);



            // Save the contacts
            var contactList = this.GetContactList();
            if (null == contactList) {
                return;
            }

            await contactList.SaveContactAsync(contact1);
            await contactList.SaveContactAsync(contact2);

            //
            // Create annotations for those test contacts.
            // Annotation is the contact meta data that allows People App to generate deep links
            // in the contact card that takes the user back into this app.
            //

            ContactAnnotationList annotationList = await _GetContactAnnotationList();
            if (null == annotationList) {
                return;
            }

            ContactAnnotation annotation = new ContactAnnotation();
            annotation.ContactId = contact1.Id;

            // Remote ID: The identifier of the user relevant for this app. When this app is
            // launched into from the People App, this id will be provided as context on which user
            // the operation (e.g. ContactProfile) is for.
            annotation.RemoteId = "user12";

            // The supported operations flags indicate that this app can fulfill these operations
            // for this contact. These flags are read by apps such as the People App to create deep
            // links back into this app. This app must also be registered for the relevant
            // protocols in the Package.appxmanifest (in this case, ms-contact-profile).
            annotation.SupportedOperations = ContactAnnotationOperations.ContactProfile;

            if (!await annotationList.TrySaveAnnotationAsync(annotation)) {
                rootPage.NotifyUser("Failed to save annotation for TestContact1 to the store.", NotifyType.ErrorMessage);
                return;
            }

            annotation = new ContactAnnotation();
            annotation.ContactId = contact2.Id;
            annotation.RemoteId = "user22";

            // You can also specify multiple supported operations for a contact in a single
            // annotation. In this case, this annotation indicates that the user can be
            // communicated via VOIP call, Video Call, or IM via this application.
            annotation.SupportedOperations = ContactAnnotationOperations.Message |
                ContactAnnotationOperations.AudioCall |
                ContactAnnotationOperations.VideoCall;

            if (!await annotationList.TrySaveAnnotationAsync(annotation)) {
                rootPage.NotifyUser("Failed to save annotation for TestContact2 to the store.", NotifyType.ErrorMessage);
                return;
            }

            rootPage.NotifyUser("Sample data created successfully.", NotifyType.StatusMessage);*/
        }.bind(this);

        // 
        this.DeleteContact = function (contactId) {

        }.bind(this);

        // 
        this.GetContactList = function () {

        }.bind(this);

        // 
        this.GetContactAnnotationList = function () {

        }.bind(this);
    };

    var contactsService = new ContactsService();
    document.contacts = contactsService;

})();