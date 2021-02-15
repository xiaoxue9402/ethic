window.addEventListener("DOMContentLoaded", onLoad);

const app = document.getElementById("app");
const searchSwitch = document.getElementById("search-switch");
const searchInput = document.getElementById("search-input");
const deleteButton = document.getElementById("delete-button");
const keypadNums = document.getElementsByClassName("keypad-num");
async function onLoad() {
  searchSwitch.addEventListener("change", onSwitch);
  searchInput.addEventListener("input", event => onInput(event));
  deleteButton.addEventListener("click", event => onInput(event));
  let keys = [...keypadNums];
  keys.forEach(key =>
    key.addEventListener("click", event => onInput(event, key))
  );
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
  currentOptions: []
};
function onSwitch() {
  state.searchBy === "name"
    ? (searchSwitch.dataset.type = "number")
    : (searchSwitch.dataset.type = "name");
  state.searchBy = searchSwitch.dataset.type;
  console.log(searchSwitch.dataset.type);
}

function onInput(event, key) {
  console.log(event.target.id);

  if (event.target.id === "delete-button") {
    if (searchInput.value.length > 0) {
      searchInput.value = searchInput.value.substr(
        0,
        searchInput.value.length - 1
      );
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
      } else {
        state.currentOptions = [...letters];
      }
      state.currentInput = state.currentOptions[0];
      searchInput.value = state.currentInput;
    }
  }
}
