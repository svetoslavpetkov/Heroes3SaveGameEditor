import React, { useEffect, useState } from 'react';
import { remote } from "electron"
import ReactDom from 'react-dom';
import fs from "fs";
import path from "path";
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Save, FolderOpen } from '@material-ui/icons';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

interface IFileInfo {
  path: string;
  bytes: Array<number>;
}

const App = () => {
  const classes = useStyles();
  const [file, setFile] = useState<IFileInfo>({ path: "", bytes: [] });

  const selectFile = () => {
    remote.dialog.showOpenDialog({
      title: "Select save game file",
      properties: [ "openFile" ],
    }).then(result => {
      if (result.filePaths.length != 1) {
        alert("You have to select one file")
      } else {
        setFile({ path: result.filePaths[0], bytes: [] })
      }
    }).catch(e => {
      alert(`Error selecting file ${e.message}`);
    });
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={selectFile}>
            <FolderOpen />
          </IconButton>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Save />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            { file.path === "" ? "no file selected" : file.path }
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <h1>
        Hi from a react app
      </h1>
    </>
  )
}

ReactDom.render(<App />, mainElement);
