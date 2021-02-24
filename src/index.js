window.addEventListener("DOMContentLoaded", onLoad);
const url = "http://localhost:3000/contacts";

const app = document.getElementById("app");
const searchSwitch = document.getElementById("search-switch");
const searchInput = document.getElementById("search-input");
const deleteButton = document.getElementById("delete-button");
const keypadNums = document.getElementsByClassName("keypad-num");
const contactList = document.getElementById("contacts-list");
function onLoad() {
  searchSwitch.addEventListener("change", onSwitch);
  searchInput.addEventListener("input", event => onInput(event));
  deleteButton.addEventListener("click", event => onInput(event));
  let keys = [...keypadNums];
  keys.forEach(key =>
    key.addEventListener("click", event => onInput(event, key))
  );
  loadContacts();
  console.log("loooaaaadddeed");
}
let state = {
  searchBy: "name",
  keyLetters: {
    "1": [""],
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
    "0": [" "],
    "#": ["#"],
    "'*'": ["'*'", ""]
  },
  currentInput: "",
  currentOptions: [],
  matches: [],
  contacts: []
};
function onSwitch() {
  state.searchBy === "name"
    ? (searchSwitch.dataset.type = "number")
    : (searchSwitch.dataset.type = "name");
  state.searchBy = searchSwitch.dataset.type;
  state.currentOptions = [];
  state.currentInput = "";
  searchInput.value = "";
  state.matches = [];
  findMatches();
  console.log(searchSwitch.dataset.type);
}

function onInput(event, key) {
  if (event.target.id === "delete") {
    if (searchInput.value.length > 0) {
      let options = state.currentOptions;
      state.currentOptions = options.map(
        string => (string = string.substr(0, string.length - 1))
      );
      searchInput.value = state.currentOptions[0];
      state.currentInput = state.currentOptions[0];
      state.matches = [];
    } else {
      deleteButton.setAttribute("style", "display: none");
      state.matches = state.contacts;
    }
    findMatches();
  } else if (event.type === "click") {
    deleteButton.setAttribute("style", "display: contents");
    let num = key.dataset.num;

    if (state.searchBy === "name") {
      let letters = state.keyLetters[num];
      if (state.currentOptions[0]) {
        let strings = [];
        letters.map(letter =>
          state.currentOptions.forEach(string => {
            string += letter;
            strings.push(string);
          })
        );
        state.currentOptions = strings;
      } else {
        state.currentOptions = [...letters];
      }
      state.currentInput = state.currentOptions[0];
      searchInput.value = state.currentInput;
    }
    if (state.searchBy === "number") {
      state.currentOptions = [state.currentInput + num];
      state.currentInput = state.currentInput + num;
      searchInput.value = state.currentInput;
    }
  }
  findMatches();
}

async function loadContacts() {
  let options = state.currentOptions;
  if (state.contacts.length === 0) {
    const res = await axios.get(url);
    state.contacts = [...res.data];
  }
  appendContactCard();
}

function findMatches() {
  contactList.innerHTML = "";
  let options = state.currentOptions;
  console.log(options);
  if (state.searchBy === "name") {
    if (!state.matches.length) {
      options.forEach(option => {
        state.contacts.forEach(contact => {
          if (
            contact[state.searchBy].includes(option) &&
            !state.matches.includes(contact)
          ) {
            state.matches.push(contact);
          }
        });
      });
    } else {
      let newMatches = [];
      options.forEach(option => {
        state.matches.forEach(contact => {
          if (
            contact[state.searchBy].includes(option) &&
            !newMatches.includes(contact)
          ) {
            newMatches.push(contact);
          }
        });
      });
      state.matches = newMatches;
    }
  } else {
    console.log(state);
    state.matches = state.contacts.filter(contact =>
      contact["display_number"].includes(state.currentInput)
    );
  }
  appendContactCard();
}

function appendContactCard() {
  let contacts = state.contacts;
  if (state.matches.length && state.currentInput.length) {
    contacts = state.matches;
  }
  console.log(contactList);
  let contactCards = contacts.map(contact => {
    let card = document.createElement("li");
    card.innerHTML = `<li class="contact-card list-group-item" id=${contact.name}>

        <img class="img-thumbnail" src=${contact.image} class="contact-image card-img-top" />
        <div class="card-text name">${contact.display_name}</div>
        <div class="card-text number">${contact.display_number}</div>

      </li>`;
    contactList.appendChild(card);
  });
}
