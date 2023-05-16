// deps
import { Box, Text } from '@mantine/core';
import { IconPlus, IconSettings } from '@tabler/icons-react';
import { KonvaEventObject } from 'konva/lib/Node';
import { map, omit } from 'lodash';
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Layer, Rect, Stage, Text as CanvasText } from 'react-konva';
import { Html } from 'react-konva-utils';
import useSheets from '../../../../hooks/useSheets';
import TextAtomComponent from '../../../../layout/tableLayout/components/AtomComponent/TextAtomComponent';
import { ColumnMap } from '../../../../store/types';

export default function TableView() {
  const {
    sheetUrlParams: { sheetId, viewId },
    getTargetSheetViewsArray,
    getTargetViewColumns,
    getTargetViewRows,
  } = useSheets();

  const views = getTargetSheetViewsArray(sheetId);
  const columnDescriptors = getTargetViewColumns(sheetId, viewId);
  const { rowsArr } = getTargetViewRows(sheetId, viewId);

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

  // canvas 容器 DOM
  const canvasContainerRef = useRef<HTMLDivElement>();
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [workInProgressCell, setWorkInProgressCell] = useState<{
    columnType: keyof ColumnMap;
    width: number;
    value: string;
    colId: string;
    rowId: string;
  } | null>(null);

  useLayoutEffect(() => {
    setCanvasSize({
      width: canvasContainerRef.current.offsetWidth,
      height: 500,
    });
  }, []);

  const handlerEditCell = useCallback(
    (
      event: KonvaEventObject<MouseEvent>,
      cellPayload: { columnType: keyof ColumnMap; width: number; value: string; colId: string; rowId: string },
    ) => {
      console.log(event.target.attrs);
      const cellX = event.target.attrs.x;
      const cellY = event.target.attrs.y;
      setWorkInProgressCell(cellPayload);
      fasterOverlayRef.current.style.left = cellX + 'px';
      fasterOverlayRef.current.style.top = cellY + 'px';
    },
    [],
  );

  // 计算单元格的 X
  // const calculateColumnX = useCallback((colId: Key, columnsConfig: { [colId: Key]: ColumnConfig }) => {

  // }, []);

  // canvas 顶部配置的宽度
  const columnHeaderWidth = useMemo<number>(() => {
    // 把当前视图里的 columnsConfig 全部拿出来，把他们的宽度加起来
    const { columnsConfigArr } = columnDescriptors;
    let headerWidth = 0;
    columnsConfigArr.forEach(({ width: columnWidth }) => {
      headerWidth += columnWidth;
    });

    return headerWidth;
  }, [columnDescriptors]);

  const fasterOverlayRef = useRef<HTMLDivElement>();

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
      <Box ref={canvasContainerRef} className="h-80 bg-white px-4">
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

        {/* canvas视图区域 */}
        <Box className="relative">
          <Stage height={canvasSize.height} width={canvasSize.width}>
            <Layer>
              <Html>
                <Box
                  style={{ width: columnHeaderWidth, height: 30 }}
                  className="w-full border border-b-0 border-solid border-#DEE0E3 p-1 text-sm"
                >
                  列头
                </Box>
              </Html>
              {map(rowsArr, (row, rowIndex) => {
                const columnIds = Object.keys(omit(row, 'id'));

                return map(columnIds, (colId, colIndex) => {
                  const { columns, columnsConfig } = columnDescriptors;
                  // 单元格类型
                  const matchColType = columns[colId].columnType;
                  // 单元格的大小
                  const matchColWidth = columnsConfig[colId].width;
                  // 单元格的默认值
                  const matchColValue = row[colId];
                  // 除了第一列以外，后面所有列的 X 坐标 = 在他前面所有列的宽度
                  const x = 0;
                  const y = 0;
                  return (
                    <>
                      <Rect
                        x={x}
                        y={y + 30}
                        width={matchColWidth}
                        height={30}
                        strokeWidth={1}
                        stroke="#ddd"
                        onDblClick={(event) =>
                          handlerEditCell(event, {
                            columnType: matchColType,
                            width: 200,
                            value: matchColValue as string,
                            colId,
                            rowId: row.id as string,
                          })
                        }
                      />
                      <CanvasText x={x + 10} y={y + 30 + 8} fontSize={14} text={matchColValue as string} />
                    </>
                  );
                });
              })}
            </Layer>
          </Stage>
          {/* 编辑框 */}
          <Box ref={fasterOverlayRef} className="faster-overlay absolute">
            {workInProgressCell && (
              <Box>
                {workInProgressCell.columnType === 'TEXT' && (
                  <TextAtomComponent
                    destroyAtomComponent={() => setWorkInProgressCell(null)}
                    defaultValue={workInProgressCell.value}
                    width={workInProgressCell.width}
                    sheetId={sheetId}
                    viewId={viewId}
                    colId={workInProgressCell.colId}
                    rowId={workInProgressCell.rowId}
                  />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
