const path = require("path");
const fs = require("fs");
const uniqid = require("uniqid");

const contactsPath = path.format({
  root: './db/',
  name: 'contacts',
  ext: '.json'
});

function listContacts() {
  console.log(contactsPath);
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
    console.table(JSON.parse(data))
  });
};

function getContactById(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
      const newContact = JSON.parse(data).filter(value => value.id === contactId);
      console.log(newContact);
  });
};

function removeContact(contactId) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
      const jsonContacts = JSON.parse(data);
      const newContacts = jsonContacts.filter(value => value.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContacts), function (err) {
          if (err) throw err;
          console.log(`Contact remove: ${contactId}`);
          listContacts();
      });
  });
};

function addContact(name, email, phone) {
  fs.readFile(contactsPath, 'utf-8', (err, data) => {
      const jsonContacts = JSON.parse(data);
      jsonContacts.push({id: uniqid(), name: name, email: email, phone: phone});
      fs.writeFile(contactsPath, JSON.stringify(jsonContacts), function (err) {
          if (err) throw err;
          console.log(`Contact add: ${name}, with email: ${email}`);
          listContacts();
      });
  });
};


module.exports = {listContacts, getContactById, removeContact, addContact}
