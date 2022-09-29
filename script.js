var BASE_URL = "https://have-a-happy-day.web.app/";
var xhr = new XMLHttpRequest();

var ThemeManager = (function () {
  function _checkForLocalStorage() {
    return !!window.localStorage;
  }

  function _setLocalStorage(key, val) {
    if (!_checkForLocalStorage) {
      return;
    }
    return localStorage.setItem(key, val);
  }

  function _getLocalStorage(key) {
    if (!_checkForLocalStorage) {
      return;
    }
    return localStorage.getItem(key);
  }

  function changeTheme(mode) {
    try {
      if (mode) {
        document.querySelector("body").className = mode;
        _setLocalStorage("theme-option", mode);
      }
    } catch (e) {}
  }

  function setListener() {
    document
      .querySelector(".options-container")
      .addEventListener("click", function (e) {
        var currentColorMode = document.querySelector("body").className;
        if (currentColorMode === "dark-mode") {
          changeTheme("light-mode");
        } else {
          changeTheme("dark-mode");
        }
      });
  }

  function init() {
    if (_getLocalStorage("theme-option")) {
      changeTheme(_getLocalStorage("theme-option"));
    } else {
      changeTheme("light-mode");
    }
    setListener();
  }

  return {
    init: init,
    changeTheme: changeTheme,
    setListener: setListener,
  };
})();

function renderQuote(response) {
  document.getElementById("message").innerHTML = response.res.message;
  let imageUrl = "";
  if (response.res.image_link) {
    imageUrl = response.res.image_link;
  } else {
    imageUrl = BASE_URL + "images/" + response.res.image_name;
  }
  document.getElementById("image").src = imageUrl;
  document.getElementById("default").classList.add("fade-out");
  document.getElementsByClassName("container")[0].classList.add("fade-in");
}

ThemeManager.init();

xhr.open("GET", BASE_URL + "quote");
xhr.send(null);
xhr.onreadystatechange = function () {
  var DONE = 4; // readyState 4 means the request is done.
  var OK = 200; // status 200 is a successful return.
  if (xhr.readyState === DONE) {
    if (xhr.status === OK) {
      var response = JSON.parse(xhr.responseText);
      renderQuote(response);
    } else {
      console.log("Error: " + xhr.status); // An error occurred during the request.
    }
    xhr.onreadystatechange = null;
  }
};
