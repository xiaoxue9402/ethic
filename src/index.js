window.addEventListener("DOMContentLoaded", onLoad);

const app = document.getElementById("app");
const searchSwitch = document.getElementById("search-switch");
const searchInput = document.getElementById("search-input");
const deleteButton = document.getElementById("delete-button");
function onLoad() {
  searchSwitch.addEventListener("change", onSwitch);
  searchInput.addEventListener("input", event => onInput(event));
  deleteButton.addEventListener("click", event => onInput(event));

  console.log("loooaaaadddeed");
}

function onSwitch() {
  searchSwitch.dataset.type === "name"
    ? (searchSwitch.dataset.type = "number")
    : (searchSwitch.dataset.type = "name");
  console.log(searchSwitch.dataset.type);
}

function onInput(event) {
  let query;
  if (event.type === "input") {
    query = event.target.value;
  } else {
    if (searchInput.value.length > 0) {
      searchInput.value = searchInput.value.substr(
        0,
        searchInput.value.length - 1
      );  
    }
  }
}
