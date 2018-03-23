(function () {

    var logger = document.logger;

    var ContactsService = function () {

        // To allow contacts from your application to appear in the taskbar via the My People pane, 
        // you need to write them to the Windows contact store.
        //
        // Your application must also write an annotation to each contact. 
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#annotating-contacts
        this.CreateContact = function (contactId, firstName, lastName, email, phoneNumber) {
            logger.log("ceateContact");
            var contacts = Windows.ApplicationModel.Contacts;

            var contact = new contacts.Contact();
            contact.Id = contactId;
            contact.FirstName = firstName;

            var email = new contacts.ContactEmail();
            email1.Address = email;
            contact.Emails.Add(email1);

            var phone = new contacts.ContactPhone();
            phone.Number = phoneNumber;
            contact.Phones.Add(phone);

            logger.log("Get contact list");

            // Save the contact
            var contactList = this.GetContactList();
            if (null == contactList) {
                logger.log("contact list is null, return");

                return;
            }

            logger.log("Save the contact");

            contactList.SaveContactAsync(contact);

            logger.log("Annotate the contact");

            document.myPeople.AnnotateContact(contact);

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