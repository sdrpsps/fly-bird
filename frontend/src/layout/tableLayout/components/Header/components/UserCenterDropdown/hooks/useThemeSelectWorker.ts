// deps
import { ColorScheme, SelectItem } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import getLocalTheme from '../../../../../../../theme/getLocalTheme';

// types
import { ValidTheme } from '../../../../../../../theme/types';

export default function useThemeSelectWorker() {
  // 主题国际化选项
  const { t } = useTranslation();
  const themeSelectData = useMemo<SelectItem[]>(() => {
    return [
      {
        label: t('light'),
        value: 'light',
      },
      {
        label: t('dark'),
        value: 'dark',
      },
      {
        label: t('system'),
        value: 'system',
      },
    ];
  }, [t]);

  // 本地主题
  const [presentTheme, setPresentTheme] = useLocalStorage<ValidTheme>({ key: 'local-theme', defaultValue: 'system' });

  // 当前浏览器渲染的主题
  const [realTimeTheme, setRealTimeTheme] = useState<ColorScheme>(getLocalTheme());

  // 监听系统主题变化
  const watchSystemThemeChange = useCallback(() => {
    let darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
    darkThemeMq.addEventListener('change', (e) => {
      if (e.matches) {
        setRealTimeTheme('dark');
      } else {
        setRealTimeTheme('light');
      }
    });
  }, []);

  // 当本地主题修改后执行
  useEffect(() => {
    if (presentTheme === 'system') {
      watchSystemThemeChange();
      return;
    }
    setRealTimeTheme(presentTheme);
  }, [presentTheme, watchSystemThemeChange]);

  // 设置当前主题
  const mutatePresentTheme = useCallback(
    (newTheme: ValidTheme) => {
      setPresentTheme(newTheme);
    },
    [setPresentTheme],
  );
  return { themeSelectData, mutatePresentTheme, presentTheme, realTimeTheme };
}
