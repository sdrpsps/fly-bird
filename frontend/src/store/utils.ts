// 帮助我们生成各式各样的模板
import { Key } from 'react';
import { Column, ColumnConfig, Sheet, View } from './types';
import { v4 as uuid } from 'uuid';

export const viewTemplateCreator: (name: string, columnIdArr: Key[]) => View = (name, columnIdArr = []) => {
  const columnsConfig: { [columnId: Key]: ColumnConfig } = {};

  columnIdArr.forEach((columnId) => {
    columnsConfig[columnId] = {
      width: 200,
      sort: 0,
    };
  });

  return {
    id: uuid(),
    name,
    columnsConfig,
  };
};

export const columnInitTemplateCreator: (name: string) => Column<'TEXT'> = (name) => {
  return {
    id: uuid(),
    name,
    columnType: 'TEXT',
    columnProps: {},
  };
};

// 返回一个 sheetObj
export const sheetTemplateCreator: (name: string) => Sheet = (name) => {
  const sheetId = uuid();
  const defaultTextColumn = columnInitTemplateCreator('多行文本');
  const defaultView = viewTemplateCreator('表格视图', [defaultTextColumn.id]);

  return {
    id: sheetId,
    name,
    columns: {
      [defaultTextColumn.id]: defaultTextColumn,
    },
    views: {
      [defaultView.id]: defaultView,
    },
    rows: {},
  };
};
