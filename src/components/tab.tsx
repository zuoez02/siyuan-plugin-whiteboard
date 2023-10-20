import { Fragment, useState, useCallback, useEffect } from "react";
import { Tldraw, Editor } from "@tldraw/tldraw";
import { getAssetUrls } from "@tldraw/assets/selfHosted";

import { saveData } from "../services/data";
import PropTypes from "prop-types";
import "@tldraw/tldraw/tldraw.css";
import { uiOverrides } from "@/whiteboard/ui-overrides";

export const Tab = (props) => {
  const initData = props.initData;
  const realName = props.name;
  const [editor, setEditor] = useState<Editor>();

  const assetUrls = getAssetUrls({
    baseUrl: "/plugins/siyuan-plugin-whiteboard/assets/",
  });

  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);

  let timer;

  function debounce(fn, timeout) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(), timeout);
  }

  function saveNow() {
    const json = editor.store.getSnapshot();
    saveData(realName, json);
  }

  function save() {
    debounce(() => {
      saveNow();
    }, 500);
  }

  useEffect(() => {
    if (!editor) {
      return;
    }
    if (Object.keys(initData).length) {
      editor.store.loadSnapshot(initData);
    }
    editor.store.listen(() => save());
  }, [editor]);

  return (
    <Fragment>
      <div className="whiteboard-component">
        <Tldraw
          onMount={setAppToState}
          assetUrls={assetUrls}
          overrides={uiOverrides}
        />
      </div>
    </Fragment>
  );
};

Tab.propTypes = {
  el: PropTypes.object.isRequired,
};
