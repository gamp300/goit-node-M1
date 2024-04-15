const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    if (contact) {
      console.table([contact]);
    } else {
      console.log("Contact not found.");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    let contacts = JSON.parse(data);
    const filteredContacts = contacts.filter((c) => c.id !== contactId);
    if (filteredContacts.length < contacts.length) {
      fs.writeFile(
        contactsPath,
        JSON.stringify(filteredContacts, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing contacts file:", err);
            return;
          }
          console.log("Contact removed successfully.");
        }
      );
    } else {
      console.log("Contact not found.");
    }
  });
}

function addContact(id, name, email, phone) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading contacts file:", err);
      return;
    }
    let contacts = JSON.parse(data);
    let newId = id;
    if (!newId) {
      newId = generateUniqueId(contacts);
    } else {
      if (contacts.some((contact) => contact.id === newId.toString())) {
        console.error("Error: ID already exists.");
        return;
      }
    }
    const newContact = { id: newId, name, email, phone };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        console.error("Error writing contacts file:", err);
        return;
      }
      console.log("Contact added successfully.");
    });
  });
}

function removeAllContacts() {
  fs.writeFile(contactsPath, "[]", (err) => {
    if (err) {
      console.error("Error writing contacts file:", err);
      return;
    }
    console.log("All contacts removed successfully.");
  });
}

function generateUniqueId(contacts) {
  let id;
  do {
    id = Math.random().toString(36).substr(2, 9);
  } while (contacts.some((contact) => contact.id === id));
  return id;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  removeAllContacts,
};
