// deps
import { Key } from 'react';

/**
 * 定义表的类型
 */
// 允许创建的 column 类型，都列出来
export type ColumnMap = {
  TEXT: {};
  SELECT: {
    // 比如，单选类型就是要有 标题，值，ID 的数组
    options: Array<{ label: string; value: string; id: Key }>;
  };
};

// 表的列类型
export interface Column<ColumnType extends keyof ColumnMap> {
  id: Key;
  name: string;
  columnType: 'TEXT' | 'SELECT';
  columnProps: ColumnMap[ColumnType]; // 意味着根据不同列类型，会有不同的字段
  width?: number;
}

// 比如现在要创建一个 Select 类型实例，就有类型提示了
// const selectCol: Column<'SELECT'> = {
//   id: 1,
//   name: 'selectCol',
//   columnType: 'SELECT',
//   columnProps: {
//     options: [{ label: '中国', value: 'cn', id: 1 }],
//   },
// };

// 列的配置
export interface ColumnConfig {
  width: number;
  sort: number;
}

// 表的视图类型
export interface View {
  id: Key;
  name: string;
  columnsConfig: {
    [columnId: Key]: ColumnConfig;
  };
}

// 表的行类型
export interface Row {
  // 根据列来锁定 value，类似 x（id） + y（columnId）
  id: Key;
  [columnId: Key]: Key;
}

export interface Sheet {
  id: Key;
  name: string;
  columns: { [columnId: Key]: Column<any> }; // 在频繁的查询工作中，使用对象比使用数组更方便 不需要遍历整个数组
  views: { [viewId: Key]: View };
  rows: { [rowId: Key]: Row };
}
