import { useCallback, useEffect } from 'react';
import { socket } from '../index';

export default function useSocket() {
  const socketConnectedCallback = useCallback(() => {
    console.log('Socket 连接成功');
  }, []);

  const socketDisconnectedCallback = useCallback(() => {
    console.log('Socket 连接终止');
  }, []);

  const onMessageComing = useCallback((message: string) => {
    console.log('有新消息', message);
    // 开始处理版本
    // 客户端需要有一个任务队列
  }, []);

  useEffect(() => {
    socket.on('connect', socketConnectedCallback);
    socket.on('disconnect', socketDisconnectedCallback);
    socket.on('message', onMessageComing);

    // 注销事件
    return () => {
      socket.off('connect', socketConnectedCallback);
      socket.off('disconnect', socketDisconnectedCallback);
      socket.off('message', onMessageComing);
    };
  }, [socketDisconnectedCallback, socketConnectedCallback, onMessageComing]);

  // 提交新版本
  const submitNewVersion = useCallback(() => {
    socket.emit('message', JSON.stringify({ version: 2, delete: 'hello', insert: 'hello world' }));
  }, []);

  return { submitNewVersion };
}
