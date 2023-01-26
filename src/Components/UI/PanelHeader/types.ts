export interface IPanelHeader {
  type: PanelEnum;
  name: string;
  theme: string;
}

export enum PanelEnum {
  RECIPIENT = 'RECIPIENT',
  SENDER = 'SENDER',
}
