import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import fs from "fs";
import path from "path";

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);


const App = () => {

  const [files, setFiles] = useState<Array<string>>([]);

  useEffect(()=> {
    fs.readdir("./", (err, files) => {
      setFiles(files);
    })
  }, []);
  return (
    <>
      <h1>
        Hi from a react app
      </h1>
      {
        files.map((f) => (<div>{f}</div>))
      }
    </>
  )
}

ReactDom.render(<App />, mainElement);
