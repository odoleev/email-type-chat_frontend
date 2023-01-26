import React, { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { CollapseComponent, PanelEnum } from '../UI';
import { WebsocketContext } from '../../context/WebSocketContext';

export function ReceivedMessagesContent() {
  const { receivedMessages } = useTypedSelector(
    (state) => state.messagesReducer
  );
  const { username } = useTypedSelector((state) => state.usersReducer);
  const { getReceived, readMessage } = useActions();
  const [isMessageRead, setIsMessageRead] = useState<boolean>(true);

  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on('onMessage', async () => {
      await getReceived(username);
      setIsMessageRead(true);
    });
    return () => {
      socket.off('onMessage', async () => {
        await getReceived(username);
        setIsMessageRead(true);
      });
    };
  }, []);

  useEffect(() => {
    if (isMessageRead) {
      getReceived(username);
      setIsMessageRead(false);
    }
  }, [isMessageRead, socket]);

  const onChange = (keys: string[] | string) => {
    if (typeof keys === 'string') {
      setIsMessageRead(true);
      return;
    }
    if (keys.length > 0) {
      keys.map((key): void => {
        readMessage(key);
      });
      setIsMessageRead(true);
      socket.emit('read');
    }
  };

  return (
    <CollapseComponent
      type={PanelEnum.SENDER}
      messages={receivedMessages}
      onChange={onChange}
    />
  );
}
