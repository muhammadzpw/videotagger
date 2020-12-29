import React, { createContext, useState } from 'react';

export interface FileContextValues {
  filename: string;
  setFilename: (name: string) => void;
}

const defaultValue: FileContextValues = {
  filename: '',
  setFilename: name => console.log(name),
};

const FileContext = createContext<FileContextValues>(defaultValue);

const FileCtx: React.FC = ({ children }) => {
  const [filename, setFilename] = useState(defaultValue.filename);
  return (
    <FileContext.Provider value={{ filename, setFilename }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileCtx, FileContext };
