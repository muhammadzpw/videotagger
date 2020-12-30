import { CircularProgress, Divider, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useContext } from 'react';

import { backendApi } from '../api';
import { useFetch } from '../hooks/useFetchTypes';

import { FileContext } from './FileContext';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  loading: {
    textAlign: 'center',
    flexGrow: 1,
    alignContent: 'center',
  },
  file: {
    cursor: 'pointer',
    padding: theme.spacing(1, 2),
  },
}));

const FileBrowser: React.FC = () => {
  const classes = useStyles();
  const { setFilename } = useContext(FileContext);
  const { data, loading, error } = useFetch(backendApi.getFiles());
  const { data: dataUrl } = useFetch(backendApi.getUrls());

  return (
    <div className={classes.root}>
      {error && <div className={classes.loading}>Error</div>}
      {loading && (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      )}
      {data &&
        data.map((file, idx) => {
          return (
            <div
              className={classes.file}
              onClick={() => setFilename(file)}
              key={`file-${idx}`}
            >
              {file}
            </div>
          );
        })}
      <Divider />
      {dataUrl &&
        dataUrl.map((urldata, idx) => {
          return (
            <div
              className={classes.file}
              onClick={() => setFilename(urldata.url)}
              key={`url-${idx}`}
            >
              {urldata.filename}
            </div>
          );
        })}
    </div>
  );
};

export { FileBrowser };
