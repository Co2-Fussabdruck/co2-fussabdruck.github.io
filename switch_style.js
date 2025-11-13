const themeToggle = document.getElementById("theme-toggle");

document.addEventListener("DOMContentLoaded", () => {
  const theme = localStorage.getItem("theme");
  if (theme === "green") {
    document.body.classList.add("green");
    themeToggle.textContent = "🟢";
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("green");
  const isGreen = document.body.classList.contains("green");
  themeToggle.textContent = isGreen ? "🟢" : "🔵";
  localStorage.setItem("theme", isGreen ? "green" : "blue");
});
