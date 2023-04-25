// deps
import { SelectItem } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

// types
import { ValidLanguage } from '../../../../../../../i18n/types';

// 语言国际化选项
const languageSelectData: SelectItem[] = [
  {
    label: '简体中文',
    value: 'zh',
  },
  {
    label: 'English',
    value: 'en',
  },
];

export default function useLanguageSelectWorker() {
  const [presentLanguage, setPresentLanguage] = useLocalStorage<ValidLanguage>({ key: 'language', defaultValue: 'en' });
  const { i18n } = useTranslation();

  // 设置当前语言
  const mutatePresentLanguage = useCallback(
    (newLanguage: ValidLanguage) => {
      // 通知i18n
      i18n.changeLanguage(newLanguage);
      setPresentLanguage(newLanguage);
    },
    [setPresentLanguage, i18n],
  );
  return { languageSelectData, mutatePresentLanguage, presentLanguage };
}
