import { Dispatch, SetStateAction } from 'react';
import { EContent } from '../../types/content.types';

export interface IMessagesBlock {
  setContent: Dispatch<SetStateAction<EContent>>;
  content: EContent;
}
