export const init = () => {
  const htmlElement = document.documentElement;
  const themeToggleButton = document.querySelector('#themeToggleButton');
  const currentTheme = htmlElement.dataset.bsTheme;

  if (themeToggleButton) {
    themeToggleButton.checked = currentTheme === 'dark';

    themeToggleButton.addEventListener('change', () => {
      const newTheme = themeToggleButton.checked ? 'dark' : 'light';

      htmlElement.dataset.bsTheme = newTheme;
      localStorage.setItem('theme', newTheme);
    });
  }
};