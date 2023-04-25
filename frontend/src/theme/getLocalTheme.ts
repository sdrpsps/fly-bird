export default function getLocalTheme() {
  const localTheme = localStorage.getItem('local-theme');
  if (!localTheme || JSON.parse(localTheme) === 'system') {
    const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkThemeMq.matches) {
      return 'dark';
    } else {
      return 'light';
    }
  }
  return JSON.parse(localTheme);
}
