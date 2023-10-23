import { Fragment, useState } from "react";
import { Tldraw, Editor } from "@tldraw/tldraw";
import { getAssetUrls } from "@tldraw/assets/selfHosted";

import { saveData } from "../services/data";
import PropTypes from "prop-types";
import "@tldraw/tldraw/tldraw.css";
import { uiOverrides } from "@/whiteboard/ui-overrides";

export const Tab = (props) => {
  const initData = props.initData;
  const realName = props.name;
  const [editor, setEditor] = useState<Editor>(null);

  const assetUrls = getAssetUrls({
    baseUrl: "/plugins/siyuan-plugin-whiteboard/assets/",
  });

  const setAppToState = (e: Editor) => {
    if (!editor) {
      setEditor(e);
      if (Object.keys(initData).length) {
        e.store.loadSnapshot(initData);
      }
      e.store.listen(() => save(e));
      console.log('init');
    }
  };

  let timer;

  function debounce(fn, timeout) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(), timeout);
  }

  function saveNow(e) {
    console.log('save');
    const json = e.store.getSnapshot();
    saveData(realName, json);
  }

  function save(e) {
    debounce(() => {
      saveNow(e);
    }, 500);
  }

  return (
    <Fragment>
      <div className="whiteboard-component">
        <Tldraw
          onMount={setAppToState}
          persistenceKey={realName}
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
