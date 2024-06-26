const list = document.querySelector("ul");
list.lastElementChild.innerHTML = "I changed you!";

const aTag = document.querySelector("li a");
console.log(aTag);
aTag.style.color = "red";
