import { Dispatch, SetStateAction } from 'react';

export interface IEntranceForm {
  disabled: boolean;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  handleClickEnterButton: () => void;
}
