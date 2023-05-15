import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Sheet } from '../types';
import { Key } from 'react';
// import { SheetOperator } from '../../operations/SheetOperator';
import { sheetTemplateCreator } from '../utils';

// const sheetOperator = new SheetOperator();

// 初始值
let initialState: { [sheetId: Key]: Sheet } = {
  'd771f407-96dd-40ce-972d-04b4037b9dbf': {
    id: 'd771f407-96dd-40ce-972d-04b4037b9dbf',
    name: '未命名子表',
    columns: {
      '1c133347-19a8-44b5-801e-e9e43891a9eb': {
        id: '1c133347-19a8-44b5-801e-e9e43891a9eb',
        name: '多行文本',
        columnType: 'TEXT',
        columnProps: {},
      },
    },
    views: {
      'ae1efad8-27f6-49ad-9931-23b48df4eeca': {
        id: 'ae1efad8-27f6-49ad-9931-23b48df4eeca',
        name: '表格视图',
      },
    },
    rows: {},
  },
};

const sheetSlice = createSlice({
  name: 'sheets',
  initialState: initialState,
  reducers: {
    // 创建表格
    createSheet: (state, action: PayloadAction<{ name: string }>) => {
      // 这里面要拆分对应的OT 发送给服务端
      // 只要做非常简单的事情 你把表创建好就行了 至于传送给服务端的事情 不让这个 reducer去做
      // 1. 创建一个子表对象
      // 2. 修改本地的redux数据
      // 3. 讲对应的子表对象通过调用 generateOperations 生成对应的原子事件
      // const ops = sheetOperator.generateOperations('sheetObj');
      // 发送给服务端
      // 入队列
      // queue.push(ops);
      // 构建一个表出来
      const sheetCount = Object.values(state).length;
      const sheet = sheetTemplateCreator(action.payload.name || `数据表${sheetCount}`);

      state[sheet.id] = sheet;
    },
    // 删除表格
    deleteSheet: (state, action: PayloadAction) => {},
    // 重命名表格
    renameSheet: (state, action: PayloadAction) => {},
  },
});

export const { createSheet, deleteSheet, renameSheet } = sheetSlice.actions;
export default sheetSlice.reducer;
