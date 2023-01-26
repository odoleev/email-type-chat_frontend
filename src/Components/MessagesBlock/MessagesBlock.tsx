import React, { ReactNode } from 'react';
import { Col, Menu, MenuProps, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { MailOutlined } from '@ant-design/icons';
import { EContent } from '../../types/content.types';
import { IMessagesBlock } from './types';
import { MenuItem } from '../../types/menu-item.type';
import { SendMessageContent } from '../SendMessageContent';
import { SentMessagesContent } from '../SentMessagesContent';
import { ReceivedMessagesContent } from '../ReceivedMessagesContent';

export function MessagesBlock({ setContent, content }: IMessagesBlock) {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuProps['items'] = [
    getItem('Send Message', EContent.SEND_MESSAGE, <MailOutlined />),
    getItem('Sent Messages', EContent.SENT_MESSAGES),
    getItem('Received Messages', EContent.RECEIVED_MESSAGES),
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setContent(e.key as EContent);
  };

  const contentChoose = (type: EContent): ReactNode => {
    switch (type) {
      case EContent.SEND_MESSAGE:
        return <SendMessageContent />;
      case EContent.SENT_MESSAGES:
        return <SentMessagesContent />;
      case EContent.RECEIVED_MESSAGES:
        return <ReceivedMessagesContent />;
    }
  };

  return (
    <Row>
      <Col span={24}>
        <Menu
          theme="dark"
          onClick={onClick}
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
          defaultSelectedKeys={[EContent.SEND_MESSAGE]}
          defaultOpenKeys={[EContent.SEND_MESSAGE]}
          mode="horizontal"
          items={items}
        />
      </Col>
      <Col span={24}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {contentChoose(content)}{' '}
        </Content>
      </Col>
    </Row>
  );
}
