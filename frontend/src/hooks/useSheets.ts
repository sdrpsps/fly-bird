import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Key, useCallback, useMemo } from 'react';
import { get } from 'lodash';
import { Sheet } from '../store/types';
import { createSheet, updateRow } from '../store/slicers/sheetSlice';
import { useNavigate, useParams } from 'react-router-dom';

export default function useSheets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

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

  // 获取目标表格的视图列表
  const getTargetSheetViewsArray = useCallback(
    (sheetId: Key) => {
      return Object.values(sheets[sheetId].views);
    },
    [sheets],
  );

  // 导航去对应的视图
  const navigateToTargetView = useCallback(
    (sheetId: Key, viewId?: Key) => {
      if (!viewId) {
        const firstView = getTargetSheetViewsArray(sheetId)[0];
        viewId = firstView.id;
      }
      navigate(`/sheet/${sheetId}/${viewId}`);
    },
    [getTargetSheetViewsArray, navigate],
  );

  // 获取 URL 中的 SheetId 和 ViewId
  const sheetUrlParams = useMemo<{ sheetId: string; viewId: string }>(() => {
    return {
      sheetId: params.sheetId,
      viewId: params.viewId,
    };
  }, [params]);

  // 获取对应视图的列
  const getTargetViewColumns = useCallback(
    (sheetId: Key, viewId: Key) => {
      const targetSheet = get(sheets, [sheetId]);
      const targetView = get(targetSheet, ['views', viewId]);

      return {
        columns: targetSheet.columns,
        columnsConfig: targetView.columnsConfig,
        sheetId,
        columnsArr: Object.values(targetSheet.columns),
        columnsConfigArr: Object.values(targetView.columnsConfig),
        viewId,
      };
    },
    [sheets],
  );

  // 获取对应视图的行
  const getTargetViewRows = useCallback(
    (sheetId: Key, viewId: Key) => {
      const targetSheet = get(sheets, [sheetId]);

      return {
        rows: targetSheet.rows,
        rowsArr: Object.values(targetSheet.rows),
      };
    },
    [sheets],
  );

  // 设置单元格的值
  const setCellValue = useCallback(
    (sheetId: Key, viewId: Key, colId: Key, rowId: Key, value: string) => {
      dispatch(updateRow({ sheetId, viewId, colId, rowId, newValue: value }));
    },
    [dispatch],
  );

  return {
    sheets,
    sheetsArray,
    getSheet,
    createSheetDispatch,
    getView,
    getTargetSheetViewsArray,
    navigateToTargetView,
    sheetUrlParams,
    getTargetViewColumns,
    getTargetViewRows,
    setCellValue,
  };
}
