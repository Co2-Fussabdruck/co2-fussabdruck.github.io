const themeToggle = document.getElementById("theme-toggle");
let theme_color = document.querySelector(":root")
const colors = ["#fe2712", "#fbf203", "#0247fe", "#ff7f00", "#66b032", "#800080"];

let currentTheme = 0



function saveTheme() {
  localStorage.setItem("theme", currentTheme)
}
if (isNaN(parseInt(localStorage.getItem("theme"))) == true) {
  saveTheme()
} else {
  currentTheme = localStorage.getItem("theme")
}

function updateTheme() {
  theme_color.style.setProperty("--theme", colors[currentTheme])
}

document.addEventListener("DOMContentLoaded", ()=>{
  updateTheme()
});

themeToggle.addEventListener("click", () => {
  currentTheme = (currentTheme + 1) % colors.length
  updateTheme()
  saveTheme()
});
