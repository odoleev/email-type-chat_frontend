import { IMessages } from '../../../types/messages.types';
import { PanelEnum } from '../PanelHeader';

export interface ICollapse {
  type: PanelEnum;
  onChange: (key: string | string[]) => void;
  messages: IMessages;
}
