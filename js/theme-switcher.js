const switcher = document.querySelector('.switcher__input');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
let currentTheme;

function setTheme(currentTheme) {
  document.documentElement.setAttribute('data-color-theme', currentTheme);
  localStorage.setItem('color-theme', currentTheme);
}

// checked if there is something in localStorage, if there is a preference for dark mode, and if not, set it to default to 'light' mode
if (localStorage.getItem('color-theme')) {
  currentTheme = localStorage.getItem('color-theme');
  if (currentTheme === 'dark') switcher.checked = true;
} else if (window.matchMedia && prefersDark.matches) {
  currentTheme = 'dark';
  switcher.checked = true;
} else {
  // default
  currentTheme = 'light';
}

// change the theme
switcher.addEventListener('change', () => {
  currentTheme = document.documentElement.getAttribute('data-color-theme') === "dark" ? "light" : "dark";
  setTheme(currentTheme);
})

// then when the user changes their theme preference
prefersDark.addEventListener('change', function (event) {
  currentTheme = event.matches ? 'dark' : 'light';
  if (currentTheme === 'dark') switcher.checked = true;
  if (currentTheme === 'light') switcher.checked = false;
  setTheme(currentTheme);
});

setTheme(currentTheme);
