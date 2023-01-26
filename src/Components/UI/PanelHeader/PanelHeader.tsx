import React from 'react';
import { IPanelHeader, PanelEnum } from './types';

export function PanelHeader({ type, theme, name }: IPanelHeader) {
  return (
    <div style={{ display: 'flex', gap: '25px', maxWidth: '500px' }}>
      <div>
        <strong>
          {type === PanelEnum.RECIPIENT ? 'Recipient: ' : 'Sender: '}
        </strong>
        {name}
      </div>
      <div>
        <strong>Theme: </strong>
        {theme}
      </div>
    </div>
  );
}
