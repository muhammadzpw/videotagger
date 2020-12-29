import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';
import React, { createRef, useContext, useEffect, useState } from 'react';

import { backendApi } from '../api';
import { useFetch } from '../hooks/useFetchTypes';
import { Label } from '../models/response';

import { FileContext } from './FileContext';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const VideoPlaceHolder: React.FC = () => {
  const { filename } = useContext(FileContext);
  const videoRef = createRef<HTMLVideoElement>();
  const [labels, setLabels] = useState<Label[]>([]);
  const { data } = useFetch(backendApi.getState(filename));

  useEffect(() => {
    if (data) {
      setLabels(data.labels);
    }
  }, [data, setLabels]);

  const label = async (lbl: string) => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const item: Label = {
        label: lbl,
        time: currentTime,
      };
      const newLabels = [...labels, item].sort((a, b) => a.time - b.time);

      setLabels(newLabels);
      await backendApi.saveState({
        filename,
        labels: newLabels,
        last_time: currentTime,
      });
    }
  };

  const next = (sec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += sec;
    }
  };

  const prev = (sec: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime -= sec;
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current?.pause();
    }
  };

  return (
    <Paper>
      <video
        key={filename}
        height="360"
        width="640"
        id="myVideo"
        controls
        ref={videoRef}
      >
        <source src={`data/${filename}`} type="video/mp4" />
        <track kind="descriptions" />
        Not supported
      </video>
      <div>
        <Button onClick={() => prev(60)}>Prev(60)</Button>
        <Button onClick={() => prev(10)}>Prev(10)</Button>
        <Button onClick={() => prev(1)}>Prev(1)</Button>
        <Button onClick={togglePlayPause}>Play/Pause</Button>
        <Button onClick={() => next(1)}>Next(1)</Button>
        <Button onClick={() => next(10)}>Next(10)</Button>
        <Button onClick={() => next(60)}>Next(60)</Button>
      </div>
      <div>
        <Button onClick={() => label('iklan')}>Iklan</Button>
        <Button onClick={() => label('non-iklan')}>Non-Iklan</Button>
      </div>

      <div>
        <LabelsViewer labels={labels} />
      </div>
    </Paper>
  );
};

interface LabelsViewerProps {
  labels: Label[];
}
const LabelsViewer: React.FC<LabelsViewerProps> = ({ labels }) => {
  const classes = useStyles();
  const [selectedIdx, setSelectedIdx] = useState<number>();
  const onListClick = (idx: number) => () => {
    setSelectedIdx(idx);
  };
  return (
    <div className={classes.root}>
      <List component="nav">
        {labels.map((label, idx) => (
          <ListItem
            button
            key={idx}
            selected={selectedIdx === idx}
            onClick={onListClick(idx)}
          >
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText primary={label.label} secondary={label.time} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export { VideoPlaceHolder };
