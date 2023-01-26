import React from 'react';
import { Button, Col, Input, Row } from 'antd';
import { IEntranceForm } from './types';

export function EntranceForm({
  disabled,
  inputValue,
  setInputValue,
  handleClickEnterButton,
}: IEntranceForm) {
  return (
    <Row style={{ marginBottom: '25px' }} align="middle" justify="center">
      <Col span={2}>
        <span>Enter your name:</span>
      </Col>
      <Col span={12}>
        <Input.Group compact>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.trim())}
            style={{ width: 'calc(100% - 75px)' }}
          />
          <Button
            style={{ width: '75px', padding: '5px' }}
            onClick={handleClickEnterButton}
            type="primary"
            disabled={disabled}
          >
            Enter
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
