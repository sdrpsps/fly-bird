// deps
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import useThemeSelectWorker from './layout/tableLayout/components/Header/components/UserCenterDropdown/hooks/useThemeSelectWorker';

export default function RouteGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = true;
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate('/home');
    }
  }, [navigate]);

  const { realTimeTheme } = useThemeSelectWorker();

  return (
    <MantineProvider
      theme={{ colors: { transparent: ['transparent'] }, colorScheme: realTimeTheme }}
      withGlobalStyles
      withNormalizeCSS
    >
      <Outlet />
    </MantineProvider>
  );
}
