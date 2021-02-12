window.addEventListener("DOMContentLoaded", onLoad);

const app = document.getElementById("app");
const searchSwitch = document.getElementById("search-switch");
const searchInput = document.getElementById("search-input");
const deleteButton = document.getElementById("delete-button");
const keypadNums = document.getElementsByClassName("keypad-num")
function onLoad() {
  searchSwitch.addEventListener("change", onSwitch);
  searchInput.addEventListener("input", event => onInput(event));
  deleteButton.addEventListener("click", event => onInput(event));
  keypadNums.forEach(key => key.addEventListener("click", event => onInput(event)))
  console.log("loooaaaadddeed");
}
let state = {
  searchBy: 'name',
  keyLetters: {
    "2": ['a', 'b', 'c'],
    "3": ['d', 'e', 'f'],
    "4": ['g', 'h', 'i'],
    "5": ['j', 'k', 'l'],
    "6": ['m', 'n', 'o'],
    "7": ['p', 'q', 'r', 's'],
    "8": ['t', 'u', 'v'],
    "9": ['w', 'x', 'y', 'z']
  },
  currentInput: '',
  currentOptions: []
}
function onSwitch() {
  searchSwitch.dataset.type === "name"
    ? (searchSwitch.dataset.type = "number")
    : (searchSwitch.dataset.type = "name");
    state.searchBy = searchSwitch.dataset.type
  console.log(searchSwitch.dataset.type);
}

function onInput(event) {
  let query;
  let key = event.target.dataset.num

   if (event.type === "input") {
    query = event.target.value;
  } else if (event.type === "click") {
    if (state.searchBy === "name") {
      let letters = state.keyLetters[event.target.dataset.num]
      if (state.currentOptions.length > 0) {
        for (let i = 0; i < state.currentOptions.length; i++) {
          for (let j = 0; j < letters.length; j++) {
            state.currentOptions.push(state.currentOptions[i] + letters[j])
          }
        }
      }
    }
  } else {
    if (searchInput.value.length > 0) {
      searchInput.value = searchInput.value.substr(
        0,
        searchInput.value.length - 1
      );
    }
  }
}
