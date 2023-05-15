import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Key, useCallback, useMemo } from 'react';
import { get } from 'lodash';
import { Sheet } from '../store/types';
import { createSheet } from '../store/slicers/sheetSlice';

export default function useSheets() {
  const dispatch = useDispatch();

  const sheets = useSelector((state: RootState) => state.sheets);
  const sheetsArray = useMemo<Array<Sheet>>(() => Object.values(sheets), [sheets]);

  // 获取单独一张表
  const getSheet = useCallback((sheetId: Key) => sheets[sheetId], [sheets]);

  // 创建一张表
  const createSheetDispatch = useCallback(
    (sheetName: string) => {
      dispatch(createSheet({ name: sheetName }));
    },
    [dispatch],
  );

  // 获取视图
  const getView = useCallback((sheetId: Key, viewId: Key) => get(sheets, [sheetId, viewId]), [sheets]);

  return { sheets, sheetsArray, getSheet, createSheetDispatch, getView };
}
