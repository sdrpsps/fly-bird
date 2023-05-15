// 帮助我们生成各式各样的模板
import { Column, Sheet, View } from './types';
import { v4 as uuid } from 'uuid';

export const viewTemplateCreator: (name: string) => View = (name) => {
  return {
    id: uuid(),
    name,
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
  const defaultView = viewTemplateCreator('表格视图');

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
