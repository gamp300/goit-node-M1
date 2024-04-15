const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(id, name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

function parseArguments(args) {
  const parsedArgs = {};
  let idProvided = false;
  args.forEach((arg, index, array) => {
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      let value = array[index + 1];
      if (key === "id") {
        idProvided = true;
      }
      parsedArgs[key] = value;
    }
  });

  if (!idProvided) {
    parsedArgs["id"] = null;
  }

  return parsedArgs;
}

invokeAction(parseArguments(process.argv.slice(2)));
