import { Input } from '@mantine/core';
import { FocusEventHandler, Key, useCallback } from 'react';
import useSheets from '../../../../../hooks/useSheets';

interface TextAtomComponentProp {
  defaultValue: string;
  width: number;
  destroyAtomComponent: VoidFunction;
  sheetId: Key;
  viewId: Key;
  colId: Key;
  rowId: Key;
}

export default function TextAtomComponent({
  defaultValue = '',
  width = 200,
  destroyAtomComponent,
  sheetId,
  viewId,
  colId,
  rowId,
}: TextAtomComponentProp) {
  const { setCellValue } = useSheets();

  const mutateTextColumn = useCallback<FocusEventHandler<HTMLInputElement>>(
    (event) => {
      // 修改 redux 的值
      setCellValue(sheetId, viewId, colId, rowId, event.target.value);
      destroyAtomComponent();
    },
    [colId, destroyAtomComponent, rowId, setCellValue, sheetId, viewId],
  );

  return (
    <Input
      onBlur={mutateTextColumn}
      styles={{ input: { width: width + 'px' } }}
      className="rounded-none"
      defaultValue={defaultValue}
    />
  );
}
