import React, { useContext } from 'react';

import { FileBrowser } from '../components/FileBrowser';
import { FileContext } from '../components/FileContext';
import { VideoPlaceHolder } from '../components/VideoPlaceHolder';

const HomePage: React.FC = () => {
  const { filename } = useContext(FileContext);
  return (
    <>
      <FileBrowser />
      Choosen: {filename}
      <VideoPlaceHolder key={filename} />
    </>
  );
};

export { HomePage };
