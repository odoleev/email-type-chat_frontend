import React from 'react';
import { CheckCircleTwoTone, MessageTwoTone } from '@ant-design/icons';
import { Collapse } from 'antd';
import { IMessage } from '../../../types/messages.types';
import { PanelHeader } from '../PanelHeader';
import { ICollapse } from './types';
import { dateConverter } from '../../../utils/dateConverter';

export function CollapseComponent({ type, messages, onChange }: ICollapse) {
  const { Panel } = Collapse;
  return (
    <Collapse onChange={(key) => onChange(key)}>
      {messages.map((message: IMessage) => (
        <Panel
          key={message.id}
          header={
            <PanelHeader
              type={type}
              name={message.recipient}
              theme={message.theme}
            />
          }
          extra={
            <div style={{ display: 'flex', gap: '5px' }}>
              <span> {dateConverter(message.date)}</span>
              <div>
                {message.unread ? (
                  <MessageTwoTone />
                ) : (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                )}
              </div>
            </div>
          }
        >
          {message.text}
        </Panel>
      ))}
    </Collapse>
  );
}
