(function () {

    var logger = document.logger;

    var ContactsService = function () {

        var contactStore = null;

        function getContactStoreAsync() {
            if (!window.Windows) {
                logger.Log("Contacts API is not supported on web");
                return;
            }

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

        function getContactListAsync() {

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
        };

        //
        this.GetContactsAsync = function () {
            return getContactListAsync()
                .then(function (contactList) {
                    return contactList.getContactReader().readBatchAsync();
                })
                .then(function (contactBatch) {
                    return contactBatch.contacts;
                });
        };

        // To allow contacts from your application to appear in the taskbar via the My People pane, 
        // you need to write them to the Windows contact store.
        //
        // Your application must also write an annotation to each contact. 
        // https://docs.microsoft.com/en-us/windows/uwp/contacts-and-calendar/my-people-support#annotating-contacts
        this.SaveContactAsync = function (contact) {
            return getContactListAsync()
                .then(function onSuccess(contactList) {
                    return contactList.saveContactAsync(contact);
                })
                .then(function () {
                    return Promise.resolve(contact);
                });
        }.bind(this);

        // 
        this.DeleteContactAsync = function (contact) {
            return getContactListAsync()
                .then(function (contactList) {
                    return contactList.deleteContactAsync(contact);
                })
        }.bind(this);
    };

    var contactsService = new ContactsService();
    document.contacts = contactsService;

})();