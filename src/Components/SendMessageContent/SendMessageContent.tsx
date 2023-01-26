import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Input, message, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { IMessages, ISendingMessage } from '../../types/messages.types';
import { CollapseComponent, PanelEnum } from '../UI';
import { WebsocketContext } from '../../context/WebSocketContext';

export function SendMessageContent() {
  const [form] = Form.useForm();
  const { users, username } = useTypedSelector((state) => state.usersReducer);
  const { sentMessages } = useTypedSelector((state) => state.messagesReducer);
  const { getUsers, getSent, sendMessage } = useActions();
  const [isRecipientSelected, setIsRecipientSelected] =
    useState<boolean>(false);

  const [messagesToCurrentRecipient, setMessagesToCurrentRecipient] =
    useState<IMessages>([]);
  const [textAlert, setTextAlert] = useState<boolean>(false);
  const [recipientAlert, setRecipientAlert] = useState<boolean>(false);

  const socket = useContext(WebsocketContext);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    getSent(username);
    setIsRecipientSelected(false);
  }, [isRecipientSelected, form]);

  const onSelectClick = () => {
    getUsers();
  };
  const onSelectChange = (value: string) => {
    setIsRecipientSelected(true);

    setMessagesToCurrentRecipient(
      sentMessages.filter((mes) => {
        return mes.recipient === value;
      })
    );
  };
  const onSendMessage = (values: {
    theme: string | undefined;
    recipient: string;
    text: string;
  }) => {
    if (!values.recipient) {
      setRecipientAlert(true);
      if (!values.text) {
        setTextAlert(true);
      }
      return;
    }

    if (!values.text) {
      setTextAlert(true);
      return;
    }

    const message: ISendingMessage = {
      sender: username,
      recipient: values.recipient,
      text: values.text,
    };

    if (values.theme) {
      message.theme = values.theme;
    }

    sendMessage(message);
    socket.emit('message');
    form.resetFields();
    messageApi.open({
      type: 'success',
      content: 'Message successfully sent!',
    });
    setMessagesToCurrentRecipient([]);
    setIsRecipientSelected(true);
  };

  const onFocus = () => {
    setRecipientAlert(false);
    setTextAlert(false);
  };

  return (
    <>
      {contextHolder}
      <Row gutter={[16, 16]}>
        <Col md={12} lg={12} xl={12} span={12} sm={24} xs={24}>
          <Form
            form={form}
            onFocus={onFocus}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 25 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={onSendMessage}
          >
            <Form.Item label="Theme" name="theme">
              <Input />
            </Form.Item>
            <Form.Item label="Recipient" name="recipient" required>
              <Select
                onChange={onSelectChange}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                onClick={onSelectClick}
                options={users.map((user) => {
                  return {
                    label: user.username,
                    value: user.username.toLowerCase(),
                  };
                })}
              >
                {users.map((user) => (
                  <Select.Option key={user.id} value={user.username}>
                    {user.username}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            {recipientAlert && (
              <Form.Item wrapperCol={{ offset: 4, span: 25 }}>
                <Alert type="warning" message="Choose recipient" />
              </Form.Item>
            )}

            <Form.Item name="text" label="Text" required>
              <TextArea showCount rows={4} />
            </Form.Item>
            {textAlert && (
              <Form.Item wrapperCol={{ offset: 4, span: 25 }}>
                <Alert
                  style={{ maxWidth: '500px' }}
                  type="warning"
                  message="Minimum 1 sign required"
                />
              </Form.Item>
            )}
            <Form.Item wrapperCol={{ offset: 12, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Send
              </Button>
            </Form.Item>
          </Form>
        </Col>
        {messagesToCurrentRecipient.length > 0 && (
          <Col md={12} lg={12} xl={12} sm={24} xs={24}>
            <CollapseComponent
              type={PanelEnum.RECIPIENT}
              onChange={() => {}}
              messages={messagesToCurrentRecipient}
            />
          </Col>
        )}
      </Row>
    </>
  );
}
