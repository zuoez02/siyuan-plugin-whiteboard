import { showMessage } from 'siyuan';
import { useState } from "react";
import { addWhiteboard, renameWhiteboard } from "../services/data";
import { global } from '@/utils/env';

const InvalidPathChar = [
  "\\",
  "/",
  ":",
  "*",
  "?",
  '"',
  "<",
  ">",
  "|",
  "$",
  "&",
  "^",
  ".",
];

export const DialogContent = (props) => {
  const [name, setName] = useState(props.oldName);
  const save = (name) => {
    const result = name.trim();
    if (!result || InvalidPathChar.some((v) => result.indexOf(v) !== -1)) {
      showMessage(global.plugin.i18n.nameIsInvalid.replace("${name}", name));
      return;
    }
    if (props.type === "create") {
      addWhiteboard(name);
    } else {
      renameWhiteboard(props.oldName, name);
    }
    props.onSave && props.onSave(name);
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      save(e.target.value);
    }
  };

  return (
    <div id="create-whiteboard">
      <label className="fn__flex b3-label config__item">
        <div className="fn__flex-1">
          {global.plugin.i18n.form.name}
          <div className="b3-label__text">
          {global.plugin.i18n.form.nameDesc}
          </div>
        </div>
        <span className="fn__space"></span>
        <input
          id="draw-name"
          className="b3-text-field fn__flex-center fn__size200"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
        />
      </label>
      <div className="button-group" style={{float: 'right', margin: '20px 0 10px'}}>
        <button id="saveDraw" className="b3-button" onClick={() => save(name)}>
          {global.plugin.i18n.form.save}
        </button>
      </div>
    </div>
  );
};