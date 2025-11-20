import dayjs from "dayjs";

console.log("Hello, World!");
console.log(dayjs().format("{YYYY} MM-DD   HH:mm"));

function toggleMenu() {
  const burgerIcon = document.querySelector(".burger-icon");
  const navMenu = document.querySelector(".nav-menu");
  burgerIcon.classList.toggle("open");
  navMenu.classList.toggle("open");
}

window.toggleMenu = toggleMenu;

sdata = [
  {
    HSN: "0080",
    TSN: "017",
    "Leistung (kw)": "120",
    Kennzeichen: "S-WW 123",
    Saison: "12",
  },
  {
    HSN: "0080",
    TSN: "017",
    "Leistung (kw)": "120",
    Kennzeichen: "S-WW 234",
    Saison: "12",
  },
  {
    HSN: "0203",
    TSN: "003",
    "Leistung (kw)": "99",
    Kennzeichen: "S-WW 345",
    Saison: "8",
  },
  {
    HSN: "0203",
    TSN: "003",
    "Leistung (kw)": "99",
    Kennzeichen: "S-WW 456",
    Saison: "8",
  },
  {
    HSN: "0203",
    TSN: "003",
    "Leistung (kw)": "99",
    Kennzeichen: "S-WW 567",
    Saison: "8",
  },
  {
    HSN: "0203",
    TSN: "003",
    "Leistung (kw)": "99",
    Kennzeichen: "S-WW 678",
    Saison: "8",
  },
  {
    HSN: "0203",
    TSN: "003",
    "Leistung (kw)": "99",
    Kennzeichen: "S-WW 789",
    Saison: "8",
  },
  {
    HSN: "0100",
    TSN: "001",
    "Leistung (kw)": "175",
    Kennzeichen: "n/a",
    Saison: "6",
  },
  {
    HSN: "0100",
    TSN: "001",
    "Leistung (kw)": "154",
    Kennzeichen: "n/a",
    Saison: "12",
  },
  {
    HSN: "0366",
    TSN: "007",
    "Leistung (kw)": "75",
    Kennzeichen: "S-XY 1210",
    Saison: "12",
  },
];

// Für globalen Zugriff verfügbar machen
window.vehicleData = data;

// HSN-Ausgabe
console.log("HSN-Liste:");
data.forEach((item) => {
  console.log(item.HSN);
});

export { toggleMenu, data };
