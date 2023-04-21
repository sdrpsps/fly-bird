// deps
import { Box, Header as HeaderContainer, Text } from '@mantine/core';

// svg
import { IconChevronLeft, IconFolderFilled, IconLock, IconStar } from '@tabler/icons-react';
import { useCallback } from 'react';

export default function Header() {
  // 双击表名修改
  const onEditTableName = useCallback(() => {}, []);

  return (
    <HeaderContainer height={64}>
      <Box className="flex h-full items-center justify-between pl-4">
        {/* 左边区域 */}
        <Box className="flex h-full items-center">
          {/* 返回图标 */}
          <IconChevronLeft />
          {/* 表格信息 */}
          <Box className="flex flex-col gap-1">
            {/* 表名 + 收藏 */}
            <Box className="flex h-6 items-center">
              <Box className="px-1 text-sm" onDoubleClick={onEditTableName}>
                ✅任务管理
              </Box>
              {/*<Input defaultValue="✅任务管理" />*/}
              <Box className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-md hover:bg-slate-400">
                <IconStar className="h-3 w-3" />
              </Box>
            </Box>
            {/* 我的空间 + 最近修改时间 */}
            <Box className="flex h-4 items-center">
              {/* 我的空间 */}
              <Box className="flex items-center gap-1 pl-1">
                <IconFolderFilled className="h-3 w-3 text-#646A73" />
                <Text className="text-xs text-#646A73">我的空间</Text>
                <Box style={{ width: '1px' }} className="mx-2 h-3 bg-#DEE0E3" />
              </Box>
              {/* 最近修改时间 */}
              <Text className="text-xs text-#646A73">最近修改：18分钟前</Text>
            </Box>
          </Box>
        </Box>
        {/* 右边区域 */}
        <Box className="flex h-full items-center ">
          {/* 按钮 */}
          <Box className="flex items-center">
            <Box className="ml-3 flex h-8 w-20 items-center justify-center gap-1 rounded-md bg-#3370FF text-sm text-white">
              <IconLock width={16} height={16} />
              <Text>分享</Text>
            </Box>
            <Box className="ml-3 flex h-8 w-20 items-center justify-center gap-1 rounded-md bg-#3370FF text-sm text-white">
              <IconLock width={16} height={16} />
              <Text>分享</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </HeaderContainer>
  );
}
