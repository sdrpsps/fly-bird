import { ActionIcon, Box, Divider, Input, Navbar as NavbarContainer, Text } from '@mantine/core';
import useSheets from '../../../../hooks/useSheets';
import { map } from 'lodash';
import IconSheet from '../../../../assets/svgComponents/IconSheet';
import { IconDots, IconPlus } from '@tabler/icons-react';
import { useCallback, useRef, useState } from 'react';

export default function Navbar() {
  // hooks
  const { sheetsArray, createSheetDispatch } = useSheets();

  // 创建表格输入框显示状态
  const [showCreateSheetInput, setShowCreateSheetInput] = useState<boolean>(false);
  // 创建表格输入框 DOM
  const createSheetInputRef = useRef<HTMLInputElement>();
  // 点击创建表格
  const createSheetHandler = useCallback(() => {
    setShowCreateSheetInput(true);
    requestIdleCallback(() => {
      createSheetInputRef?.current.focus();
    });
  }, []);
  // 创建表格输入框失焦，请求创建表格
  const requestCreateSheet = useCallback(() => {
    const sheetName = createSheetInputRef.current.value;
    createSheetDispatch(sheetName);
    setShowCreateSheetInput(false);
  }, [createSheetDispatch]);

  return (
    <NavbarContainer w={280}>
      {/* 表格列表模块 */}
      <Box className="relative h-full w-full p-2">
        {/* 循环 */}
        {
          <Box>
            {map(sheetsArray, (sheet) => {
              return (
                <Box
                  key={sheet.id}
                  className="flex h-9 cursor-pointer items-center justify-between rounded px-1 hover:bg-slate-200"
                >
                  <Box className="flex items-center gap-1">
                    <IconSheet />
                    <Text className="text-sm">{sheet.name}</Text>
                  </Box>
                  <ActionIcon>
                    <IconDots />
                  </ActionIcon>
                </Box>
              );
            })}
            {showCreateSheetInput && (
              <Input
                onBlur={requestCreateSheet}
                defaultValue={`数据表 ${sheetsArray.length + 1}`}
                ref={createSheetInputRef}
              />
            )}
          </Box>
        }
        {/* 操作模块 */}
        <Box style={{ width: `calc(100% - 16px)` }} className="absolute bottom-0 px-3 pb-4">
          <Divider />
          <Text color="#646A73" className="mb-2 flex h-8 items-center pt-2 text-sm">
            新建
          </Text>
          <Box
            onClick={createSheetHandler}
            className="flex h-9 cursor-pointer items-center justify-between rounded px-2 hover:bg-slate-200"
          >
            <Box style={{ color: '#A45EEb' }} className="flex  items-center gap-1">
              <IconSheet />
              <Text className="text-sm text-black">新建数据表</Text>
            </Box>
            <IconPlus size={16} />
          </Box>
        </Box>
      </Box>
    </NavbarContainer>
  );
}
