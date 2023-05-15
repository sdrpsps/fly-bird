// deps
import { Box, Text } from '@mantine/core';
import useSheets from '../../../../hooks/useSheets';
import { map } from 'lodash';
import { useMemo } from 'react';
import { IconPlus, IconSettings } from '@tabler/icons-react';

export default function TableView() {
  const {
    sheetUrlParams: { sheetId, viewId },
    getTargetSheetViewsArray,
  } = useSheets();

  const views = getTargetSheetViewsArray(sheetId);

  const navigateBarConfig = useMemo(() => {
    return [
      [
        {
          id: '1',
          icon: <IconPlus size={14} />,
          label: '添加记录',
          color: '#3370FF',
        },
      ],
      [
        {
          id: '2',
          icon: <IconSettings size={14} />,
          label: '字段配置',
        },
        {
          id: '3',
          icon: <IconSettings size={14} />,
          label: '筛选',
        },
        {
          id: '4',
          icon: <IconSettings size={14} />,
          label: '分组',
        },
        {
          id: '5',
          icon: <IconSettings size={14} />,
          label: '排序',
        },
        {
          id: '6',
          icon: <IconSettings size={14} />,
          label: '行高',
        },
      ],
      [
        {
          id: '7',
          icon: <IconSettings size={14} />,
          label: '提醒',
        },
        {
          id: '8',
          icon: <IconSettings size={14} />,
          label: '生成表单',
        },
      ],
    ];
  }, []);

  return (
    <Box className="pr-5">
      {/* 头部的视图列表 */}
      <Box>
        {map(views, (view) => {
          return (
            <Box className="w-fit rounded bg-white p-3" key={view.id}>
              {view.name}
            </Box>
          );
        })}
      </Box>
      {/* 导航控制面板 */}
      <Box className="h-80 rounded-lg bg-white px-4">
        <Box className="h-10">
          {/* 左侧 */}
          <Box className="flex h-full gap-4">
            {map(navigateBarConfig, (parentArr, index) => {
              return (
                <Box key={index} className="flex gap-4">
                  {map(parentArr, (nav) => {
                    return (
                      <Box key={nav.id} className="flex items-center text-sm">
                        {nav.icon}
                        <Text>{nav.label}</Text>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
        {/* 右侧 */}
        <Box></Box>
      </Box>

      {/* canvas视图区域 */}
    </Box>
  );
}
