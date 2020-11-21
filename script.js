var BASE_URL = "https://have-a-happy-day.web.app/";
var xhr = new XMLHttpRequest();
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

function renderQuote(response) {
  document.getElementById("message").innerHTML = response.res.message;
  let imageUrl = "";
  if (response.res.image_link) {
    imageUrl = image_link;
  } else {
    imageUrl = BASE_URL + "images/" + response.res.image_name;
  }
  document.getElementById("image").src = imageUrl;
  document.getElementById("default").classList.add("fade-out");
  document.getElementsByClassName("container")[0].classList.add("fade-in");
}
