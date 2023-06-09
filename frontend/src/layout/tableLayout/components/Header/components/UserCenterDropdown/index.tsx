// deps
import { Avatar, Box, Text } from '@mantine/core';

// components
import UserCenterSelectItem from './components/UserCenterSelectItem';
import useLanguageSelectWorker from './hooks/useLanguageSelectWorker';

// types
import { ValidLanguage } from '../../../../../../i18n/types';
import { ValidTheme } from '../../../../../../theme/types';
import useThemeSelectWorker from './hooks/useThemeSelectWorker';

export default function Index() {
  // 语言选项、当前所选语言、修改语言方法
  const { languageSelectData, presentLanguage, mutatePresentLanguage } = useLanguageSelectWorker();

  // 主题选项、当前所选主题、修改主题方法
  const { themeSelectData, presentTheme, mutatePresentTheme } = useThemeSelectWorker();

  return (
    <Box>
      <Box className="flex w-72 items-center gap-2 border-0 border-b border-solid border-#646A73/10 p-4">
        <Avatar color="#3370FF" className="h-12 w-12 cursor-pointer rounded-full bg-#3370FF">
          向阳
        </Avatar>
        <Box className="flex flex-col">
          <Text className="text-#1F2329">向阳</Text>
          <Text className="text-sm text-#646A73">飞鸟个人用户</Text>
        </Box>
      </Box>
      {/* 语言 */}
      <UserCenterSelectItem<ValidLanguage>
        label="language"
        selectData={languageSelectData}
        onSelectChange={mutatePresentLanguage}
        defaultSelect={presentLanguage}
      />
      {/* 主题 */}
      <UserCenterSelectItem<ValidTheme>
        label="theme"
        selectData={themeSelectData}
        onSelectChange={mutatePresentTheme}
        defaultSelect={presentTheme}
      />
    </Box>
  );
}
