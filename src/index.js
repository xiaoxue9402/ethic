window.addEventListener("DOMContentLoaded", onLoad);
const url = "http://localhost:3000/contacts"

const app = document.getElementById("app");
const searchSwitch = document.getElementById("search-switch");
const searchInput = document.getElementById("search-input");
const deleteButton = document.getElementById("delete-button");
const keypadNums = document.getElementsByClassName("keypad-num");
function onLoad() {
  searchSwitch.addEventListener("change", onSwitch);
  searchInput.addEventListener("input", event => onInput(event));
  deleteButton.addEventListener("click", event => onInput(event));
  let keys = [...keypadNums];
  keys.forEach(key =>
    key.addEventListener("click", event => onInput(event, key))
  );
  loadContacts()
  console.log("loooaaaadddeed");
}
let state = {
  searchBy: "name",
  keyLetters: {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"]
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
  console.log(searchSwitch.dataset.type);
}

function onInput(event, key) {
  if (event.target.id === "delete-button") {
    if (searchInput.value.length > 0) {
      let options = state.currentOptions;
      state.currentOptions = options.map(
        string => (string = string.substr(0, string.length - 1))
      );
      searchInput.value = state.currentOptions[0];
      state.currentInput = state.currentOptions[0];
    }
  } else if (event.type === "click") {
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
        // findMatches(strings)
      } else {
        state.currentOptions = [...letters];
      }
      state.currentInput = state.currentOptions[0];
      searchInput.value = state.currentInput;
    }
  }
  findMatches()
}


async function loadContacts() {
  let options = state.currentOptions
  if (state.contacts.length === 0) {
    const res = await axios.get(url)
    state.contacts = [...res.data]
    console.log(state)
  }

}

function findMatches() {
  let options = state.currentOptions
  console.log(options)

  if (!state.matches.length) {
    options.forEach(option => {
      state.contacts.forEach(contact => {
        if (contact[state.searchBy].includes(option)) {
          state.matches.push(contact)
        }
      })
    })
  } else {
    let newMatches = []
    options.forEach(option => {
      state.matches.forEach(contact => {
        if (contact[state.searchBy].includes(option) && !newMatches.includes(contact)) {
          newMatches.push(contact)
        }
      })
    })
    state.matches = newMatches
    console.log(state)
  }
}
