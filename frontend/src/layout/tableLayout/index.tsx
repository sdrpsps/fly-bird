// deps
import { AppShell, Box } from '@mantine/core';
import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Header from './components/Header';
import Navbar from './components/Navbar';

export default function TableLayout(props: PropsWithChildren) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const localLanguage = JSON.parse(localStorage.getItem('language'));
    if (!localLanguage) return;
    i18n.changeLanguage(localLanguage);
  }, [i18n]);

  return (
    <AppShell header={<Header />} navbar={<Navbar />}>
      <Box pl={280}>{props.children}</Box>
    </AppShell>
  );
}
