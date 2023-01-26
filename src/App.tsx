import './App.css';
import { useState } from 'react';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import { EContent } from './types/content.types';
import { EntranceForm, MessagesBlock } from './Components';

export function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const { username } = useTypedSelector((state) => state.usersReducer);

  const [content, setContent] = useState<EContent>(EContent.SEND_MESSAGE);

  const { getUsername, clearAll, clearSent, clearReceived } = useActions();

  const handleClickEnterButton = () => {
    clearReceived();
    clearSent();
    clearAll();
    getUsername(inputValue);
    setContent(EContent.SEND_MESSAGE);
  };

  return (
    <div>
      <EntranceForm
        disabled={!inputValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleClickEnterButton={handleClickEnterButton}
      />
      {username && <MessagesBlock setContent={setContent} content={content} />}
    </div>
  );
}
