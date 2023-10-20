import React from 'react';
import ReactDOM from 'react-dom/client';
import { Dialog } from 'siyuan';
import { DialogContent } from '../components/dialog-content';

export const addWhiteboard = (callback) => {
  const d = new Dialog({
    title: "创建白板",
    content: `<div class="b3-dialog__content"><div id="create-whiteboard"></div></div>`,
    width: "520px",
  });
  let root;
  const props = {
    type: 'create',
    oldName: '',
    onSave: (name) => {
        root.unmount();
        d.destroy();
        callback(name);
    }
  }
  root = ReactDOM.createRoot(
    document.querySelector("#create-whiteboard")
  );
  root.render(React.createElement(DialogContent, props));
};

export const renameWhiteboard = (name, callback) => {
    const d = new Dialog({
      title: "重命名白板",
      content: `<div class="b3-dialog__content"><div id="rename-whiteboard"></div></div>`,
      width: "520px",
    });
    let root;
    const props = {
      type: 'rename',
      oldName: name,
      onSave: (newName) => {
          root.unmount();
          d.destroy();
          callback(newName);
      }
    }
    root = ReactDOM.createRoot(
      document.querySelector("#rename-whiteboard")
    );
    root.render(React.createElement(DialogContent, props));
  };