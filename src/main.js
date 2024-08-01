import dayjs from "dayjs";

console.log("Hello, World!");
console.log(dayjs().format('{YYYY} MM-DD   HH:mm'))

function toggleMenu() {
  const burgerIcon = document.querySelector(".burger-icon");
  const navMenu = document.querySelector(".nav-menu");
  burgerIcon.classList.toggle("open");
  navMenu.classList.toggle("open");
}

window.toggleMenu = toggleMenu;

export { toggleMenu };
