let root = document.documentElement;
const themeButton = document.getElementById('theme');

const variables = [
  '--clr-background',
  '--clr-text',
  '--clr-accent1',
  '--clr-accent2',
];

const availableThemes = [
  'light',
  'dark',
  'blue',
  'gold',
  'grey',
  'green',
  'yellow',
];

const themes = {
  light: ['#e9e6e1', '#211d1e', '#d3a999', '#a5aeb7'],
  dark: ['#0f0909', '#dedddd', '#ea110b', '#b8b8b8'],
  blue: ['#dcdde1', '#373945', '#3a7af2', '#c0c3cb'],
  gold: ['#eeede8', '#656c74', '#a47f48', '#262125'],
  grey: ['#eceef0', '#0e1515', '#7c7c7d', '#949698'],
  green: ['#073630', '#f9f8f6', '#eee1d8', '#dbc7ae'],
  yellow: ['#272727', '#fdbf2d', '#d2d2ca', '#f9f9f9'],
};

let defaultTheme = 'grey';
let theme;

if (!localStorage.currentTheme) {
  localStorage.setItem('currentTheme', defaultTheme);
  changeTheme(defaultTheme);
  themeButton.innerText = nextTheme(defaultTheme, availableThemes);
} else {
  theme = localStorage.getItem('currentTheme');
  changeTheme(theme);
  const comingTheme = nextTheme(theme, availableThemes);
  themeButton.innerText = comingTheme;
}

themeButton.addEventListener('click', () => {
  theme = localStorage.getItem('currentTheme');
  const comingTheme = nextTheme(theme, availableThemes);
  changeTheme(comingTheme);
  localStorage.setItem('currentTheme', comingTheme);
  themeButton.innerText = nextTheme(comingTheme, availableThemes);
});

function changeTheme(theme) {
  for (let i = 0; i < variables.length; i++) {
    root.style.setProperty(variables[i], themes[theme][i]);
  }
}

function nextTheme(currentTheme, availableThemes) {
  const currentIndex = availableThemes.findIndex(
    (element) => element === currentTheme
  );

  if (currentIndex === availableThemes.length - 1) {
    return availableThemes[0];
  } else return availableThemes[currentIndex + 1];
}
