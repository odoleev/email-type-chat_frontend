import React, { useContext, useEffect } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { CollapseComponent, PanelEnum } from '../UI';
import { WebsocketContext } from '../../context/WebSocketContext';

export function SentMessagesContent() {
  const { sentMessages } = useTypedSelector((state) => state.messagesReducer);
  const { username } = useTypedSelector((state) => state.usersReducer);
  const { getSent } = useActions();

  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on('onRead', async () => {
      await getSent(username);
    });
    return () => {
      socket.off('onRead', async () => {
        await getSent(username);
      });
    };
  }, []);

  useEffect(() => {
    getSent(username);
  }, [socket]);

  const onChange = (keys: string[] | string) => {};

  return (
    <CollapseComponent
      type={PanelEnum.RECIPIENT}
      messages={sentMessages}
      onChange={onChange}
    />
  );
}
