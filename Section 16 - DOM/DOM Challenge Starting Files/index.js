document.querySelector("ul").lastElementChild.innerHTML = "I changed you!";

document.querySelector("li a").style.color = "red";

document.querySelector("button").style.backgroundColor = "yellow";

function toggleHeader() {
  document.querySelector("h1").classList.toggle("huge");
}
