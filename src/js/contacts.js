(function () {

    var logger = document.logger;

    var ContactsService = function () {

        var contactStore = null;

        function getContactStoreAsync() {
            var contacts = Windows.ApplicationModel.Contacts;

            if (contactStore == null) {
                return contacts.ContactManager.requestStoreAsync(contacts.ContactStoreAccessType.appContactsReadWrite)
                    .then(function (e) {
                        contactStore = e;
                        return contactStore;
                    });
            }
            else {
                return Promise.resolve(contactStore);
            }
        }

        // To allow contacts from your application to appear in the taskbar via the My People pane, 
        // you need to write them to the Windows contact store.
        //
        // Your application must also write an annotation to each contact. 
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#annotating-contacts
        this.CreateContactAsync = function (firstName, lastName, email, phoneNumber) {

            var contacts = Windows.ApplicationModel.Contacts;

            var contact = new contacts.Contact();
            contact.firstName = firstName;
            contact.lastName = lastName;

            //var email = new contacts.ContactEmail();
            //email.address = email;
            //contact.emails.add(email);

            //var phone = new contacts.ContactPhone();
            //phone.Number = phoneNumber;
            //contact.phones.add(phone);

            return this.GetContactListAsync()
                .then(function (contactList) {
                    return contactList.saveContactAsync(contact);
                });

        }.bind(this);

        // 
        this.DeleteContactAsync = function (contact) {

        }.bind(this);

        // 
        this.GetContactListAsync = function () {

            return getContactStoreAsync()
                .then(function (contactStore) {
                    return contactStore.findContactListsAsync();
                })
                .then(function (contactLists) {
                    if (!contactLists || contactLists.length == 0) {
                        return contactStore.createContactListAsync("MyPeoplePWAContactList");
                    }
                    else {
                        return Promise.resolve(contactLists[0]);
                    }
                });

        }.bind(this);
    };

    var contactsService = new ContactsService();
    document.contacts = contactsService;

})();