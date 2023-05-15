import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Key, useCallback, useMemo } from 'react';
import { get } from 'lodash';
import { Sheet } from '../store/types';
import { createSheet } from '../store/slicers/sheetSlice';
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

  return {
    sheets,
    sheetsArray,
    getSheet,
    createSheetDispatch,
    getView,
    getTargetSheetViewsArray,
    navigateToTargetView,
    sheetUrlParams,
  };
}
