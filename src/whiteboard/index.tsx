import { Fragment, useState } from "react";
import { Tldraw, Editor, TLTextShape } from "@tldraw/tldraw";
import { getAssetUrls } from "@tldraw/assets/selfHosted";

import { saveData } from "../services/data";
import PropTypes from "prop-types";
import "@tldraw/tldraw/tldraw.css";
import { LinkDocTool } from "./shapes/LinkDoc/LinkDocTool";
import { LinkDocUtil } from "./shapes/LinkDoc/LinkDocUtil";
import { uiOverrides } from "./ui-overrides";
import { ILinkDoc } from "./shapes/LinkDoc/link-doc-types";

const customShapeUtils = [LinkDocUtil];
const customTools = [LinkDocTool];

const siyuanLinkRegex = /^\(\((\d+\-\S+) \'\S+\'\)\)$/;

export const Whiteboard = (props) => {
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

      e.registerExternalContentHandler("text", ({ type, point, text }) => {
        if (type === "text") {
          if (siyuanLinkRegex.test(text)) {
            const res = siyuanLinkRegex.exec(text);
            const docId = res[1];
            console.log(res, docId);
            const center = point ?? e.viewportPageCenter;
            e.createShape<ILinkDoc>({
              type: "linkDoc",
              x: center.x,
              y: center.y,
              props: {
                docId,
              },
            });
          }
        }
      });
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
          // Pass in the array of custom shape classes
          shapeUtils={customShapeUtils}
          // Pass in the array of custom tool classes
          tools={customTools}
          // Pass in any overrides to the user interface
          overrides={uiOverrides}
        />
      </div>
    </Fragment>
  );
};

Whiteboard.propTypes = {
  el: PropTypes.object.isRequired,
};
