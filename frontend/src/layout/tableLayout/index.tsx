// deps
import { AppShell, Box, Button } from '@mantine/core';
import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSocket from '../../socket/hooks/useSocket';

// components
import Header from './components/Header';
import Navbar from './components/Navbar';

export default function TableLayout(props: PropsWithChildren) {
  // 国际化
  const { i18n } = useTranslation();

  // socket.io
  const { submitNewVersion } = useSocket();

  useEffect(() => {
    const localLanguage = JSON.parse(localStorage.getItem('language'));
    if (!localLanguage) return;
    i18n.changeLanguage(localLanguage);
  }, [i18n]);

  return (
    <AppShell header={<Header />} navbar={<Navbar />}>
      <Box pl={280}>
        {props.children}
        <Button onClick={submitNewVersion}>Submit</Button>
      </Box>
    </AppShell>
  );
}
