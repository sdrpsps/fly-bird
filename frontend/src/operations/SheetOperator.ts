export class SheetOperator {
  // 生成原子事件
  generateOperations: (name: string) => {};

  // 应用事件
  apply: () => {
    // 将对应的原子对象 可能是在服务端推送过来的
    // 进行对应的变动 追加到 redux 里
    // 触发 dispatch store
  };

  // 发送事件给服务端
  send: (ops: any) => {};
}
