// deps
import { Avatar, Box, Text } from '@mantine/core';

// components
import UserCenterSelectItem from './components/UserCenterSelectItem';
import useLanguageSelectResolver from './hooks/useLanguageSelectResolver';

// types
import { ValidLanguage } from '../../../../../../i18n/types';

export default function Index() {
  const { languageSelectData, presentLanguage, mutatePresentLanguage } = useLanguageSelectResolver();

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
    </Box>
  );
}
