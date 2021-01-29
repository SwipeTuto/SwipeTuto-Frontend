import { useEffect, useState } from 'react';
import { toggleThemeAction } from '../redux/layout/layout-actions';
import { useDispatch } from 'react-redux';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const dispatch = useDispatch();

  const toggleTheme = () => {
    if (theme === 'light') {
      window.localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      window.localStorage.setItem('theme', 'light')
      setTheme('light')
    }
    dispatch(toggleThemeAction(window.localStorage.getItem('theme')))
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : "light";
    localTheme && setTheme(localTheme);
    dispatch(toggleThemeAction(localTheme))
  }, [dispatch]);

  return [theme, toggleTheme]
};
